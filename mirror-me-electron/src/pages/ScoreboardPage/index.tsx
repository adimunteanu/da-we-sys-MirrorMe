import { COMPANIES } from '../../globals';
import { CompanyRelevantDataObject, ScoresObject } from '../../types';

export const computeScore = (data: CompanyRelevantDataObject[]) => {
  const score: ScoresObject = {
    scoreTotal: 0,
    scoreInsta: 0,
    scoreReddit: 0,
  };

  data.forEach((company) => {
    switch (company.company) {
      case COMPANIES.REDDIT.name: {
        score.scoreReddit = Object.values(company.data.contributions).reduce(
          (total: number, contribution: Array<any>) =>
            total + contribution.length,
          0
        );
        score.scoreTotal += score.scoreReddit;
        break;
      }
      case COMPANIES.INSTAGRAM.name: {
        score.scoreInsta = Object.values(company.data.contributions).reduce(
          (total: number, contribution: Array<any>) =>
            total + contribution.length,
          0
        );
        score.scoreTotal += score.scoreInsta;
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
