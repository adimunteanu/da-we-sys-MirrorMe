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
  subreddits: number;
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
  };
  interests: {
    ads: string[];
    topics: string[];
  };
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
  };
  relationships: {
    friends: string[];
  };
  interests: {
    advertisors: string[];
    topics: string[];
  };
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
};

export type NicknameAndScore = {
  nickname: string;
  score: ScoresObject;
};

export interface ChartCardProps {
  title: string;
  chart: JSX.Element;
  isFullscreen?: boolean;
  onDismiss?: () => void;
}

export interface ChartProps {
  data: unknown;
  chartType: ChartType;
}
