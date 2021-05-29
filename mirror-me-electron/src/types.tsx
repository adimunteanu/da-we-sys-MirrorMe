export type Route = string;

export type Page = {
  route: Route;
  title: string;
};

export type RedditRelevantData = {
  gender: string;
  ip_logs: {
    date: Date;
    ip: string;
  }[];
  contributions: {
    comments: {
      subreddit: string;
      date: Date;
    }[];
    votes: boolean[];
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
  bender: any[];
  ip_logs: any[];
  contributions: {
    comments: number;
    votes: number;
    posts: number;
    messages: number;
  };
  subreddits: number;
  transactions: any[];
};

export type CompanyRelevantData = RedditRelevantData | InstagramRelevantData;

export type CompanyRelevanDataObject = {
  company: string;
  data: CompanyRelevantData;
};
