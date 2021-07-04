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
        const { linkedIdentities } = company.data as RedditRelevantData;
        const ips = (company.data as RedditRelevantData).ipLogs.length;
        score.scoreReddit = contributions + linkedIdentities * 10 + ips * 2;
        score.scoreTotal += score.scoreReddit;
        break;
      }
      case COMPANIES.INSTAGRAM.name: {
        const contributions = Object.values(company.data.contributions).reduce(
          (total: number, contribution: Array<any>) =>
            total + contribution.length,
          0
        );
        const adsInterests = (company.data as InstagramRelevantData).interests
          .ads.length;
        const topics = (company.data as InstagramRelevantData).interests.topics
          .length;
        const { devices } = company.data as InstagramRelevantData;
        const { syncedContacts } = company.data as InstagramRelevantData;
        const { adsViewed } = company.data as InstagramRelevantData;
        score.scoreInsta =
          contributions +
          adsInterests * 5 +
          topics +
          devices * 10 +
          syncedContacts +
          adsViewed * 1.5;
        score.scoreTotal += score.scoreInsta;
        break;
      }
      case COMPANIES.FACEBOOK.name: {
        const contributions = Object.values(company.data.contributions).reduce(
          (total: number, contribution: Array<any>) =>
            total + contribution.length,
          0
        );
        const {
          pictures,
        } = (company.data as FacebookRelevantData).contributions;
        const topics = (company.data as FacebookRelevantData).interests.topics
          .length;
        const advertisersUploaded = (company.data as FacebookRelevantData)
          .interests.advertisors.length;
        const { advertisersInteracted } = company.data as FacebookRelevantData;
        const { offFacebookActivities } = company.data as FacebookRelevantData;
        const { ips } = company.data as FacebookRelevantData;
        score.scoreFacebook =
          contributions +
          pictures * 2.5 +
          topics +
          advertisersUploaded * 5 +
          advertisersInteracted * 2 +
          offFacebookActivities +
          ips * 1.5;
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
