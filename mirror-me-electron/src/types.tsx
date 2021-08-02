export type Route = string;

export type Page = {
  route: Route;
  title: string;
};

export type RedditRelevantData = {
  account: string[];
  ipLogs: {
    date: Date;
    ip: string;
  }[];
  contributions: {
    comments: {
      subreddit: string;
      body: string;
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
      body: string;
      from: string;
    }[];
  };
  subreddits: number[];
  linkedIdentities: number[];
};

export type InstagramRelevantData = {
  contributions: {
    comments: {
      date: Date;
      content: string;
    }[];
    messages: {
      participant: string;
      content: string;
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
    syncedContacts: number[];
  };
  interests: {
    ads: string[];
    adsViewed: number[];
    topics: string[];
  };
  devices: number[];
};

export type FacebookRelevantData = {
  account: string[];
  contributions: {
    comments: {
      date: Date;
    }[];
    messages: {
      title: string;
      sender: string;
      date: Date;
      content: string;
    }[];
    posts: {
      location:
        | {
            longitude: number;
            latitude: number;
          }
        | undefined;
      date: Date;
    }[];
    reactions: {
      type: string;
      date: Date;
    }[];
    media: number[];
  };
  relationships: {
    friends: string[];
  };
  interests: {
    advertisors: string[];
    advertisersInteracted: number[];
    topics: string[];
  };
  ips: string[];
  offFacebookActivities: number[];
};

export type CompanyRelevantData =
  | RedditRelevantData
  | InstagramRelevantData
  | FacebookRelevantData;

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
  scoreFacebook: number;
};

export type NicknameAndScore = {
  nickname: string;
  score: ScoresObject;
};

export interface ChartCardProps {
  title: string;
  chart: JSX.Element;
  fullscreenChart?: JSX.Element;
  fullscreenIcon?: string;
  isFullscreen?: boolean;
  onDismiss?: () => void;
}

export type Location = { longitude: number; latitude: number };

export interface ChartProps {
  data: unknown;
  chartType: ChartType;
}
