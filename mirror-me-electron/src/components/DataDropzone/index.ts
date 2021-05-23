import JSZip from 'jszip';
import { readString } from 'react-papaparse';

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

const relevantJSON = {
  gender: [] as any[],
  ip_logs: [] as any[],
  contributions: {
    comments: 0,
    votes: 0,
    posts: 0,
    messages: 0,
  },
  subreddits: 0,
  transactions: [] as any[],
};

export const processReddit = (acceptedFiles: Array<File>) => {
  const zip = new JSZip();
  zip
    .loadAsync(acceptedFiles[0])
    .then(
      (zipped) => {
        zipped.forEach(async (relativePath, file) => {
          const currentFile = await file.async('text');
          const jsonData = readString(currentFile, { header: true }).data;
          switch (relativePath) {
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
          return relevantJSON;
        });
        return null;
      },
      () => {
        throw new Error('Invalid format');
      }
    )
    .catch((err) => console.log(err));
};

export default '';
