export type Route = string;

export type Page = {
  route: Route;
  title: string;
};

export type RedditRelevantData = {
  gender: string;
  ipLogs: {
    date: Date;
    ip: string;
  }[];
  contributions: {
    comments: {
      subreddit: string;
      date: Date;
    }[];
    votes: {
      subreddit: string;
      direction: boolean;
    }[];
    posts: {
      subreddit: string;
      date: Date;
    }[];
    messages: {
      date: Date;
      from: string;
    }[];
  };
  subreddits: number;
};

export type InstagramRelevantData = {
  contributions: {
    comments: {
      date: Date;
    }[];
    messages: {
      participant: string;
      date: Date;
    }[];
    posts: {
      date: Date;
    }[];
    likes: {
      date: Date;
    }[];
    stories: {
      date: Date;
    }[];
  };
  relationships: {
    followers: string[];
    followings: string[];
  };
  interests: {
    ads: string[];
    topics: string[];
  };
};

export type CompanyRelevantData = RedditRelevantData | InstagramRelevantData;

export type CompanyRelevantDataObject = {
  company: string;
  logo: string;
  data: CompanyRelevantData;
};

export enum ChartType {
  BAR,
  LINE,
  PIE,
  DONUT,
}

export type ScoresObject = {
  scoreTotal: number;
  scoreReddit: number;
  scoreInsta: number;
};

export type NicknameAndScore = {
  nickname: string;
  score: ScoresObject;
};
