import JSZip from 'jszip';
import jetpack from 'fs-jetpack';
import { readString } from 'react-papaparse';
import { DATA_DIR } from '../../globals';
import { InstagramRelevantData, RedditRelevantData } from '../../types';

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
      switch (promises.paths[i]) {
        case relevantFields.REDDIT.GENDER: {
          const values = getValuesFromObject(jsonData[0], ['account_gender']);
          [relevantJSON.gender] = values;
          break;
        }
        case relevantFields.REDDIT.IP_LOGS: {
          jsonData.forEach((object) => {
            const values = getValuesFromObject(object, ['date', 'ip']);
            if (values[0] !== 'registration ip') {
              relevantJSON.ipLogs.push({
                date: values[0],
                ip: values[1],
              });
            }
          });
          break;
        }
        case relevantFields.REDDIT.COMMENTS: {
          jsonData.forEach((object) => {
            const values = getValuesFromObject(object, ['date', 'subreddit']);
            relevantJSON.contributions.comments.push({
              date: values[0],
              subreddit: values[1],
            });
          });
          break;
        }
        case relevantFields.REDDIT.VOTES: {
          jsonData.forEach((object) => {
            const values = getValuesFromObject(object, ['direction']);
            if (values[0] !== 'none') {
              relevantJSON.contributions.votes.push(values[0] === 'up');
            }
          });
          break;
        }
        case relevantFields.REDDIT.POSTS: {
          jsonData.forEach((object) => {
            const values = getValuesFromObject(object, ['date', 'subreddit']);
            relevantJSON.contributions.posts.push({
              date: values[0],
              subreddit: values[1],
            });
          });
          break;
        }
        case relevantFields.REDDIT.MESSAGES: {
          jsonData.forEach((object) => {
            const values = getValuesFromObject(object, ['date', 'from']);
            relevantJSON.contributions.messages.push({
              date: values[0],
              from: values[1],
            });
          });
          break;
        }
        case relevantFields.REDDIT.SUBREDDITS:
          relevantJSON.subreddits = jsonData.length;
          break;
        default:
          break;
      }
    }

    return null;
  });

  return relevantJSON;
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
      switch (promises.paths[i]) {
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
    }

    return null;
  });

  return relevantJSON;
};

export default '';
