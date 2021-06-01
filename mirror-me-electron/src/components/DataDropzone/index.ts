import JSZip from 'jszip';
import jetpack from 'fs-jetpack';
import { readString } from 'react-papaparse';
import { DATA_DIR } from '../../globals';
import {
  CompanyRelevantData,
  InstagramRelevantData,
  RedditRelevantData,
} from '../../types';

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
};

export const saveTextToFile = (name: string, content: string) => {
  jetpack.dir(DATA_DIR);
  jetpack.file(DATA_DIR + name, { content });
};

const getValuesFromObject = (object: unknown, keys: string[]): any[] => {
  const values: any[] = [];
  Object.entries(object as any).forEach(([key, value]) => {
    if (keys.includes(key)) {
      values.push(value);
    }
  });
  return values;
};

const populateJsonArray = (array: any, data: unknown[], fields: string[]) => {
  data.forEach((object) => {
    const values = getValuesFromObject(object, fields);
    const element: Record<string, any> = {};

    for (let i = 0; i < fields.length; i += 1) {
      element[fields[i]] = values[i];
    }
    array.push(element);
  });
};

export const processCompany = async (
  relevantJSON: CompanyRelevantData,
  companySwitch: (
    json: CompanyRelevantData,
    data: unknown[],
    path: string
  ) => void,
  acceptedFiles: Array<File>
): Promise<CompanyRelevantData> => {
  const promises = { promises: [] as Promise<string>[], paths: [] as string[] };

  const zip = new JSZip();
  await zip
    .loadAsync(acceptedFiles[0])
    .then(
      (zipped) => {
        zipped.forEach(async (relativePath, file) => {
          promises.promises.push(file.async('text'));
          promises.paths.push(relativePath);
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
      const jsonData = readString(values[i], { header: true }).data;
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
    acceptedFiles
  ) as Promise<RedditRelevantData>;
};

export const processInstagram = async (
  acceptedFiles: Array<File>
): Promise<InstagramRelevantData> => {
  const relevantJSON: InstagramRelevantData = {
    bender: [],
    ipLogs: [],
    contributions: {
      comments: 0,
      votes: 0,
      posts: 0,
      messages: 0,
    },
    subreddits: 0,
    transactions: [],
  };

  return processCompany(
    relevantJSON,
    (json, jsonData, path) => {
      const relevantJSON = { ...json } as InstagramRelevantData;
      switch (path) {
        case relevantFields.REDDIT.GENDER:
          relevantJSON.bender = jsonData;
          break;
        case relevantFields.REDDIT.IP_LOGS:
          relevantJSON.ipLogs = jsonData;
          break;
        case relevantFields.REDDIT.COMMENTS:
          relevantJSON.contributions.comments = jsonData.length;
          break;
        case relevantFields.REDDIT.VOTES:
          relevantJSON.contributions.votes = jsonData.length;
          break;
        case relevantFields.REDDIT.POSTS:
          relevantJSON.contributions.posts = jsonData.length;
          break;
        case relevantFields.REDDIT.MESSAGES:
          relevantJSON.contributions.messages = jsonData.length;
          break;
        case relevantFields.REDDIT.SUBREDDITS:
          relevantJSON.subreddits = jsonData.length;
          break;
        default:
          break;
      }
      json = { ...relevantJSON };
    },
    acceptedFiles
  ) as Promise<InstagramRelevantData>;
};

export default '';
