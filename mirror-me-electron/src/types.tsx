export type Route = string;

export type Page = {
  route: Route;
  title: string;
};

export type RedditRelevantData = {
  gender: any[];
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
