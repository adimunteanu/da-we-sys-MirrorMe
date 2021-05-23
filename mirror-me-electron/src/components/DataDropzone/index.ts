import JSZip from 'jszip';
import { readString } from 'react-papaparse';
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
    TRANSACITONS: 'reddit_gold_information.csv',
  },
};

export const processReddit = async (
  acceptedFiles: Array<File>
): Promise<RedditRelevantData> => {
  const relevantJSON: RedditRelevantData = {
    gender: [],
    ip_logs: [],
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
          relevantJSON.gender = jsonData;
          break;
        case relevantFields.REDDIT.IP_LOGS:
          relevantJSON.ip_logs = jsonData;
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
        case relevantFields.REDDIT.TRANSACITONS:
          relevantJSON.transactions = jsonData;
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
    ip_logs: [],
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
          relevantJSON.ip_logs = jsonData;
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
        case relevantFields.REDDIT.TRANSACITONS:
          relevantJSON.transactions = jsonData;
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
