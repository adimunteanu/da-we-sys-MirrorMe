import { COMPANIES } from '../../globals';
import {
  CompanyRelevantDataObject,
  FacebookRelevantData,
  InstagramRelevantData,
  RedditRelevantData,
  ScoresObject,
} from '../../types';

export const computeScore = (data: CompanyRelevantDataObject[]) => {
  const score: ScoresObject = {
    scoreTotal: 0,
    scoreInsta: 0,
    scoreReddit: 0,
    scoreFacebook: 0,
  };

  data.forEach((company) => {
    switch (company.company) {
      case COMPANIES.REDDIT.name: {
        score.scoreReddit = 0;
        const contributions = Object.values(company.data.contributions).reduce(
          (total: number, contribution: Array<any>) =>
            total + contribution.length,
          0
        );
        const { linkedIdentities, ipLogs } = company.data as RedditRelevantData;
        score.scoreReddit =
          contributions + linkedIdentities[0] * 10 + ipLogs.length * 2;
        score.scoreTotal += score.scoreReddit;
        break;
      }
      case COMPANIES.INSTAGRAM.name: {
        const contributions = Object.values(company.data.contributions).reduce(
          (total: number, contribution: Array<any>) =>
            total + contribution.length,
          0
        );
        const {
          ads,
          topics,
          adsViewed,
        } = (company.data as InstagramRelevantData).interests;
        const { devices } = company.data as InstagramRelevantData;
        const {
          syncedContacts,
        } = (company.data as InstagramRelevantData).relationships;
        score.scoreInsta =
          contributions +
          ads.length * 5 +
          topics.length +
          devices[0] * 10 +
          syncedContacts[0] +
          adsViewed[0] * 1.5;
        score.scoreTotal += score.scoreInsta;
        break;
      }
      case COMPANIES.FACEBOOK.name: {
        const contributions = Object.values(company.data.contributions).reduce(
          (total: number, contribution: Array<any>) =>
            total + contribution.length,
          0
        );
        const { media } = (company.data as FacebookRelevantData).contributions;
        const {
          topics,
          advertisersInteracted,
          advertisors,
        } = (company.data as FacebookRelevantData).interests;
        const {
          ips,
          offFacebookActivities,
        } = company.data as FacebookRelevantData;
        score.scoreFacebook =
          contributions +
          media[0] * 2.5 +
          topics.length +
          advertisors.length * 5 +
          advertisersInteracted[0] * 2 +
          offFacebookActivities[0] +
          ips.length * 1.5;
        score.scoreTotal += score.scoreFacebook;
        break;
      }
      default: {
        break;
      }
    }
  });

  return score;
};

export default 'score';
