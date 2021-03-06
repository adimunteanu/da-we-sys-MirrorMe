import JSZip from 'jszip';
import jetpack from 'fs-jetpack';
import { readString } from 'react-papaparse';
import {
  DATA_DIR,
  REACTION_EMOJIS,
  SUPPORTED_FILE_TYPES,
  SUPPORTED_MEDIA_TYPES,
} from '../../globals';
import {
  CompanyRelevantData,
  FacebookRelevantData,
  InstagramRelevantData,
  RedditRelevantData,
} from '../../types';
import {
  decodeString,
  getValuesFromNestedObject,
  getValuesFromObject,
  populateJsonArray,
} from './jsonUtils';

const geoip = require('offline-geo-from-ip');

const relevantFields = {
  REDDIT: {
    ACCOUNT: 'statistics.csv',
    IP_LOGS: 'ip_logs.csv',
    COMMENTS: 'comments.csv',
    POSTS: 'posts.csv',
    VOTES: 'post_votes.csv',
    MESSAGES: 'messages.csv',
    SUBREDDITS: 'subscribed_subreddits.csv',
    LINKED_IDENTITIES: 'linked_identities.csv',
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
    DEVICES: 'devices.json',
    SYNCED_CONTACTS: 'synced_contacts.json',
    ADS_VIEWED: 'ads_viewed.json',
  },
  FACEBOOK: {
    ACCOUNT: 'profile_information.json',
    COMMENTS: 'comments.json',
    MESSAGES: 'message_1.json',
    POSTS: 'your_posts_1.json',
    REACTIONS: 'posts_and_comments.json',
    FRIENDS: 'friends.json',
    ADVERTISORS:
      'advertisers_who_uploaded_a_contact_list_with_your_information.json',
    YOUR_TOPICS: 'your_topics.json',
    PICTURES: '.jpg',
    IPS: 'ip_address_activity.json',
    ADS_INTERACTED: "advertisers_you've_interacted_with.json",
    OFF_FACEBOOK_ACTIVITIES: 'your_off-facebook_activity.json',
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
  const promises = {
    promises: [] as Promise<string | void>[],
    paths: [] as string[],
  };

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

            if (SUPPORTED_MEDIA_TYPES.includes(type)) {
              promises.promises.push(Promise.resolve());
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
      if (typeof values[i] === 'string') {
        if (isJSON) {
          jsonData = JSON.parse(values[i] as string);
        } else {
          jsonData = readString(values[i] as string, { header: true }).data;
        }
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
    account: [],
    ipLogs: [],
    contributions: {
      comments: [],
      votes: [],
      posts: [],
      messages: [],
    },
    subreddits: [],
    linkedIdentities: [],
  };

  return processCompany(
    relevantJSON,
    (json, jsonData, path) => {
      const relevantJSON = { ...json } as RedditRelevantData;
      const { comments, messages, posts } = relevantJSON.contributions;

      switch (path) {
        case relevantFields.REDDIT.ACCOUNT: {
          const values = getValuesFromObject(jsonData[0], ['value']);
          relevantJSON.account.push(values[0]);
          break;
        }
        case relevantFields.REDDIT.IP_LOGS: {
          populateJsonArray(relevantJSON.ipLogs, jsonData, ['date', 'ip']);
          break;
        }
        case relevantFields.REDDIT.COMMENTS: {
          populateJsonArray(comments, jsonData, ['date', 'subreddit', 'body']);
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
          populateJsonArray(messages, jsonData, ['date', 'from', 'body']);
          break;
        }
        case relevantFields.REDDIT.SUBREDDITS:
          relevantJSON.subreddits.push(jsonData.length - 1);
          break;
        case relevantFields.REDDIT.LINKED_IDENTITIES:
          relevantJSON.linkedIdentities.push(jsonData.length - 1);
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
      syncedContacts: [0],
    },
    interests: {
      ads: [],
      adsViewed: [0],
      topics: [],
    },
    devices: [0],
  };

  return processCompany(
    relevantJSON,
    (json, jsonData, path) => {
      const relevantJSON = { ...json } as InstagramRelevantData;
      switch (path) {
        case relevantFields.INSTAGRAM.COMMENTS: {
          const values = getValuesFromNestedObject(jsonData, [
            'comments_media_comments.string_list_data.timestamp',
            'comments_media_comments.string_list_data.value',
          ]);

          for (let i = 0; i < values[0].length; i += 1) {
            relevantJSON.contributions.comments.push({
              date: new Date(values[0][i] * 1000),
              content: decodeString(values[1][i]),
            });
          }

          break;
        }
        case relevantFields.INSTAGRAM.MESSAGES: {
          const messages: any[] = [];
          const values = getValuesFromNestedObject(jsonData, [
            'participants.name',
            'messages.sender_name',
            'messages.timestamp_ms',
            'messages.content',
          ]);

          const participant = decodeString(values[0][0]);
          values[1].map((sender: any) => decodeString(sender));

          for (let i = 0; i < values[1].length; i += 1) {
            if (values[1][i] !== participant) {
              messages.push({
                participant,
                content: decodeString(values[3][i]),
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
            return {
              date: new Date(
                getValuesFromNestedObject(post, [
                  'media.creation_timestamp',
                ])[0][0] * 1000
              ),
            };
          });

          break;
        }
        case relevantFields.INSTAGRAM.LIKES: {
          relevantJSON.contributions.likes = getValuesFromNestedObject(
            jsonData,
            ['likes_media_likes.string_list_data.timestamp']
          )[0].map((value: any) => {
            return {
              date: new Date(value * 1000),
            };
          });

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
          )[0].map((value: any) => {
            return {
              date: new Date(value * 1000),
            };
          });

          break;
        }
        case relevantFields.INSTAGRAM.DEVICES: {
          relevantJSON.devices[0] = getValuesFromObject(jsonData, [
            'devices_devices',
          ])[0].length;

          break;
        }
        case relevantFields.INSTAGRAM.SYNCED_CONTACTS: {
          relevantJSON.relationships.syncedContacts[0] = getValuesFromObject(
            jsonData,
            ['contacts_contact_info']
          )[0].length;

          break;
        }
        case relevantFields.INSTAGRAM.ADS_VIEWED: {
          relevantJSON.interests.adsViewed[0] = getValuesFromObject(jsonData, [
            'impressions_history_ads_seen',
          ])[0].length;

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

export const processFacebook = async (
  acceptedFiles: Array<File>
): Promise<FacebookRelevantData> => {
  const relevantJSON: FacebookRelevantData = {
    account: [],
    contributions: {
      comments: [],
      messages: [],
      posts: [],
      reactions: [],
      media: [0],
    },
    relationships: { friends: [] },
    interests: {
      advertisors: [],
      advertisersInteracted: [0],
      topics: [],
    },
    ips: [],
    offFacebookActivities: [0],
  };

  return processCompany(
    relevantJSON,
    (json, jsonData, path) => {
      const relevantJSON = { ...json } as FacebookRelevantData;
      let isMedia = false;

      SUPPORTED_MEDIA_TYPES.forEach((type) => {
        isMedia = isMedia || path.endsWith(type);
      });

      if (isMedia) {
        relevantJSON.contributions.media[0] += 1;
      }

      switch (path) {
        case relevantFields.FACEBOOK.ACCOUNT: {
          relevantJSON.account.push(
            getValuesFromNestedObject(jsonData, [
              'profile_v2.name.full_name',
            ])[0]
          );
          break;
        }
        case relevantFields.FACEBOOK.COMMENTS: {
          relevantJSON.contributions.comments = getValuesFromNestedObject(
            jsonData,
            ['comments_v2.data.comment.timestamp']
          )[0].map((value: any) => {
            return {
              date: new Date(value * 1000),
            };
          });

          break;
        }
        case relevantFields.FACEBOOK.MESSAGES: {
          const messages: any[] = [];
          const values = getValuesFromNestedObject(jsonData, [
            'title',
            'messages.sender_name',
            'messages.timestamp_ms',
            'messages.content',
          ]);

          const title = decodeString(values[0]);
          values[1].map((sender: any) => decodeString(sender));

          for (let i = 0; i < values[1].length; i += 1) {
            messages.push({
              title,
              sender: decodeString(values[1][i]),
              content: decodeString(values[3][i]),
              date: new Date(values[2][i]),
            });
          }

          relevantJSON.contributions.messages = [
            ...relevantJSON.contributions.messages,
            ...messages,
          ];
          break;
        }
        case relevantFields.FACEBOOK.POSTS: {
          jsonData.forEach((post) => {
            const values = getValuesFromNestedObject(post, [
              'attachments.data.media.creation_timestamp',
              'attachments.data.media.media_metadata.photo_metadata.exif_data.upload_ip',
            ]);

            if (values.length > 0) {
              if (values[0][0] !== undefined) {
                let location;

                if (values[1][0] !== undefined) {
                  const { longitude, latitude } = geoip.allData(
                    values[1][0]
                  ).location;
                  location = { longitude, latitude };
                }

                relevantJSON.contributions.posts.push({
                  date: new Date(values[0][0] * 1000),
                  location,
                });
              }
            }
          });
          break;
        }
        case relevantFields.FACEBOOK.REACTIONS: {
          const values = getValuesFromNestedObject(jsonData, [
            'reactions_v2.timestamp',
            'reactions_v2.data.reaction.reaction',
          ]);

          for (let i = 0; i < values[0].length; i += 1) {
            if (REACTION_EMOJIS[values[1][i]] !== undefined) {
              relevantJSON.contributions.reactions.push({
                date: new Date(values[0][i] * 1000),
                type: REACTION_EMOJIS[values[1][i]],
              });
            }
          }

          break;
        }
        case relevantFields.FACEBOOK.FRIENDS: {
          [
            relevantJSON.relationships.friends,
          ] = getValuesFromNestedObject(jsonData, ['friends_v2.name']);

          break;
        }
        case relevantFields.FACEBOOK.ADVERTISORS: {
          const advertisors = getValuesFromNestedObject(jsonData, [
            'custom_audiences_v2',
          ])[0];

          relevantJSON.interests.advertisors = advertisors.map(
            (advertisor: string) => decodeString(advertisor)
          );

          break;
        }
        case relevantFields.FACEBOOK.YOUR_TOPICS: {
          const topics = getValuesFromNestedObject(jsonData, [
            'inferred_topics_v2',
          ])[0];

          relevantJSON.interests.topics = topics.map((topic: string) =>
            decodeString(topic)
          );

          break;
        }
        case relevantFields.FACEBOOK.OFF_FACEBOOK_ACTIVITIES: {
          relevantJSON.offFacebookActivities[0] = getValuesFromObject(
            jsonData,
            ['off_facebook_activity_v2']
          )[0].length;
          break;
        }
        case relevantFields.FACEBOOK.ADS_INTERACTED: {
          relevantJSON.interests.advertisersInteracted[0] = getValuesFromObject(
            jsonData,
            ['history_v2']
          )[0].length;
          break;
        }
        case relevantFields.FACEBOOK.IPS: {
          const ips: Set<string> = new Set();
          const ipsObjs = getValuesFromObject(jsonData, [
            'used_ip_address_v2',
          ])[0];
          ipsObjs.forEach((obj: any) => {
            if (obj.action === 'Login') {
              ips.add(obj.ip);
            }
          });

          ips.forEach((ip) => {
            relevantJSON.ips.push(ip);
          });
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
  ) as Promise<FacebookRelevantData>;
};

export default '';
