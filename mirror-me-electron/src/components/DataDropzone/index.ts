import JSZip from 'jszip';
import jetpack from 'fs-jetpack';
import { readString } from 'react-papaparse';
import { DATA_DIR, SUPPORTED_FILE_TYPES } from '../../globals';
import {
  CompanyRelevantData,
  InstagramRelevantData,
  RedditRelevantData,
} from '../../types';
import {
  decodeString,
  getValuesFromNestedObject,
  getValuesFromObject,
  populateJsonArray,
} from './jsonUtils';

const relevantFields = {
  REDDIT: {
    GENDER: 'account_gender.csv',
    IP_LOGS: 'ip_logs.csv',
    COMMENTS: 'comments.csv',
    POSTS: 'posts.csv',
    VOTES: 'post_votes.csv',
    MESSAGES: 'messages.csv',
    SUBREDDITS: 'subscribed_subreddits.csv',
  },
  INSTAGRAM: {
    COMMENTS: 'post_comments.json',
    MESSAGES: 'message_1.json',
    POSTS: 'posts_1.json',
    LIKES: 'liked_posts.json',
    FOLLOWERS: 'followers.json',
    FOLLOWINGS: 'following.json',
    ADS_INTERESTS: 'ads_interests.json',
    YOUR_TOPICS: 'your_topics.json',
    STORIES: 'stories.json',
  },
};

export const saveTextToFile = (name: string, content: string) => {
  jetpack.dir(DATA_DIR);
  jetpack.file(DATA_DIR + name, { content });
};

export const processCompany = async (
  relevantJSON: CompanyRelevantData,
  companySwitch: (
    json: CompanyRelevantData,
    data: unknown[],
    path: string
  ) => void,
  acceptedFiles: Array<File>,
  isJSON: boolean
): Promise<CompanyRelevantData> => {
  const promises = { promises: [] as Promise<string>[], paths: [] as string[] };

  const zip = new JSZip();
  await zip
    .loadAsync(acceptedFiles[0])
    .then(
      (zipped) => {
        zipped.forEach(async (relativePath, file) => {
          if (!file.dir) {
            const type = relativePath.substr(relativePath.lastIndexOf('.'));
            if (SUPPORTED_FILE_TYPES.includes(type)) {
              promises.promises.push(file.async('text'));
              promises.paths.push(
                relativePath.substr(relativePath.lastIndexOf('/') + 1)
              );
            }
          }
        });

        return null;
      },
      () => {
        throw new Error('Invalid format');
      }
    )
    .catch((err) => console.log(err));

  await Promise.all(promises.promises).then((values) => {
    for (let i = 0; i < values.length; i += 1) {
      let jsonData: any;
      if (isJSON) {
        jsonData = JSON.parse(values[i]);
      } else {
        jsonData = readString(values[i], { header: true }).data;
      }
      companySwitch(relevantJSON, jsonData, promises.paths[i]);
    }

    return null;
  });

  return relevantJSON;
};

export const processReddit = async (
  acceptedFiles: Array<File>
): Promise<RedditRelevantData> => {
  const relevantJSON: RedditRelevantData = {
    gender: '',
    ipLogs: [],
    contributions: {
      comments: [],
      votes: [],
      posts: [],
      messages: [],
    },
    subreddits: 0,
  };

  return processCompany(
    relevantJSON,
    (json, jsonData, path) => {
      const relevantJSON = { ...json } as RedditRelevantData;
      const { comments, messages, posts } = relevantJSON.contributions;
      switch (path) {
        case relevantFields.REDDIT.GENDER: {
          const values = getValuesFromObject(jsonData[0], ['account_gender']);
          [relevantJSON.gender] = values;
          break;
        }
        case relevantFields.REDDIT.IP_LOGS: {
          populateJsonArray(relevantJSON.ipLogs, jsonData, ['date', 'ip']);
          break;
        }
        case relevantFields.REDDIT.COMMENTS: {
          populateJsonArray(comments, jsonData, ['date', 'subreddit']);
          break;
        }
        case relevantFields.REDDIT.VOTES: {
          jsonData.forEach((object) => {
            const values = getValuesFromObject(object, [
              'permalink',
              'direction',
            ]);

            if (values.length > 0 && values[1] !== 'none') {
              const start = values[0].indexOf('/r/') + 3;
              const end = values[0].indexOf('/', start);
              relevantJSON.contributions.votes.push({
                subreddit: values[0].substring(start, end),
                direction: values[1] === 'up',
              });
            }
          });
          break;
        }
        case relevantFields.REDDIT.POSTS: {
          populateJsonArray(posts, jsonData, ['date', 'subreddit']);
          break;
        }
        case relevantFields.REDDIT.MESSAGES: {
          populateJsonArray(messages, jsonData, ['date', 'from']);
          break;
        }
        case relevantFields.REDDIT.SUBREDDITS:
          relevantJSON.subreddits = jsonData.length;
          break;
        default:
          break;
      }
      json = { ...relevantJSON };
    },
    acceptedFiles,
    false
  ) as Promise<RedditRelevantData>;
};

export const processInstagram = async (
  acceptedFiles: Array<File>
): Promise<InstagramRelevantData> => {
  const relevantJSON: InstagramRelevantData = {
    contributions: {
      comments: [],
      messages: [],
      posts: [],
      likes: [],
      stories: [],
    },
    relationships: {
      followers: [],
      followings: [],
    },
    interests: {
      ads: [],
      topics: [],
    },
  };

  return processCompany(
    relevantJSON,
    (json, jsonData, path) => {
      const relevantJSON = { ...json } as InstagramRelevantData;
      switch (path) {
        case relevantFields.INSTAGRAM.COMMENTS: {
          relevantJSON.contributions.comments = getValuesFromNestedObject(
            jsonData,
            ['comments_media_comments.string_list_data.timestamp']
          )[0].map((value: any) => new Date(value * 1000));

          break;
        }
        case relevantFields.INSTAGRAM.MESSAGES: {
          const messages: any[] = [];
          const values = getValuesFromNestedObject(jsonData, [
            'participants.name',
            'messages.sender_name',
            'messages.timestamp_ms',
          ]);

          const participant = decodeString(values[0][0]);
          values[1].map((sender: any) => decodeString(sender));

          for (let i = 0; i < values[1].length; i += 1) {
            if (values[1][i] !== participant) {
              messages.push({
                participant,
                date: new Date(values[2][i]),
              });
            }
          }

          relevantJSON.contributions.messages = [
            ...relevantJSON.contributions.messages,
            ...messages,
          ];
          break;
        }
        case relevantFields.INSTAGRAM.POSTS: {
          relevantJSON.contributions.posts = jsonData.map((post) => {
            return new Date(
              getValuesFromNestedObject(post, [
                'media.creation_timestamp',
              ])[0][0] * 1000
            );
          });

          break;
        }
        case relevantFields.INSTAGRAM.LIKES: {
          relevantJSON.contributions.likes = getValuesFromNestedObject(
            jsonData,
            ['likes_media_likes.string_list_data.timestamp']
          )[0].map((value: any) => new Date(value * 1000));

          break;
        }
        case relevantFields.INSTAGRAM.FOLLOWERS: {
          [
            relevantJSON.relationships.followers,
          ] = getValuesFromNestedObject(jsonData, [
            'relationships_followers.string_list_data.value',
          ]);

          break;
        }
        case relevantFields.INSTAGRAM.FOLLOWINGS: {
          [
            relevantJSON.relationships.followings,
          ] = getValuesFromNestedObject(jsonData, [
            'relationships_following.string_list_data.value',
          ]);

          break;
        }
        case relevantFields.INSTAGRAM.ADS_INTERESTS: {
          const ads = getValuesFromNestedObject(jsonData, [
            'inferred_data_ig_interest.string_map_data',
          ])[0];

          relevantJSON.interests.ads = ads.map((ad: any) => {
            const interest = getValuesFromObject(ad, [Object.keys(ad)[0]])[0];
            return decodeString(getValuesFromObject(interest, ['value'])[0]);
          });

          break;
        }
        case relevantFields.INSTAGRAM.YOUR_TOPICS: {
          const topics = getValuesFromNestedObject(jsonData, [
            'topics_your_topics.string_map_data',
          ])[0];

          relevantJSON.interests.topics = topics.map((topic: any) => {
            const name = getValuesFromObject(topic, [Object.keys(topic)[0]])[0];
            return decodeString(getValuesFromObject(name, ['value'])[0]);
          });

          break;
        }
        case relevantFields.INSTAGRAM.STORIES: {
          relevantJSON.contributions.stories = getValuesFromNestedObject(
            jsonData,
            ['ig_stories.creation_timestamp']
          )[0].map((value: any) => new Date(value * 1000));

          break;
        }
        default: {
          break;
        }
      }
      json = { ...relevantJSON };
    },
    acceptedFiles,
    true
  ) as Promise<InstagramRelevantData>;
};

export default '';
