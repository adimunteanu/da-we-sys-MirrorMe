import React from 'react';

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
  bender: any[];
  ipLogs: any[];
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

export type CompanyRelevantDataObject = {
  company: string;
  logo: string;
  summarized_card: React.ReactNode;
  data: CompanyRelevantData;
};

export enum ChartType {
  BAR,
  LINE,
  PIE,
}
