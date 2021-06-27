import React from 'react';
import REDDIT_LOGO from './images/Reddit.jpg';
import FACEBOOK_LOGO from './images/Facebook.png';
import INSTAGRAM_LOGO from './images/Instagram.png';
import SummarizedRedditCard from './components/SummarizedCard/CompanyCards/SummarizedRedditCard';
import RedditDetailPage from './pages/DetailPage/RedditDetailPage';
import SummarizedInstagramCard from './components/SummarizedCard/CompanyCards/SummarizedInstagramCard';
import InstagramDetailPage from './pages/DetailPage/InstagramDetailPage';
import SummarizedFacebookCard from './components/SummarizedCard/CompanyCards/SummarizedFacebookCard';
import FacebookDetailPage from './pages/DetailPage/FacebookDetailPage';

const APP_NAME = 'MirrorMe';

export const SUPPORTED_FILE_TYPES = ['.json', '.csv'];

export const PAGES = {
  LANDING: { route: '/', title: '' },
  LOGIN: { route: '/auth/login', title: '' },
  SIGNUP: { route: '/auth/signup', title: '' },
  OVERVIEW: { route: '/home/overview', title: 'Overview' },
  DETAIL: { route: '/home/overview/', title: 'Summary' },
  REQUEST: { route: '/home/request', title: 'Requests' },
  SCOREBOARD: { route: '/home/scoreboard', title: 'Scoreboard' },
  SETTINGS: { route: '/home/settings', title: 'Settings' },
};

export const COMPANIES = {
  REDDIT: {
    name: 'Reddit',
    logo: REDDIT_LOGO,
    summarized_component: <SummarizedRedditCard />,
    detail_page: RedditDetailPage,
    save_file: 'reddit_data.json',
  },
  INSTAGRAM: {
    name: 'Instagram',
    logo: INSTAGRAM_LOGO,
    summarized_component: <SummarizedInstagramCard />,
    detail_page: InstagramDetailPage,
    save_file: 'instagram_data.json',
  },
  FACEBOOK: {
    name: 'Facebook',
    logo: FACEBOOK_LOGO,
    summarized_component: <SummarizedFacebookCard />,
    detail_page: FacebookDetailPage,
    save_file: 'facebook_data.json',
  },
};

export const DATA_DIR = 'data/';

export const CHART_COLORS = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 205, 86)',
  'rgb(51, 204, 51)',
  'rgb(153, 102, 255)',
  'rgb(102, 255, 255)',
  'rgb(143,188,219)',
  'rgb(255,225,131)',
  'rgb(206,73,147)',
  'rgb(46,26,71)',
  'rgb(249,255,198)',
  'rgb(255,73,108)',
  'rgb(59,89,152)',
  'rgb(104,50,227)',
  'rgb(109,196,240)',
  'rgb(255,104,70)',
  'rgb(228,191,205)',
];

export const ACTIVITY_CHART_COLORS = [
  'rgb(143,188,219)',
  'rgb(255,225,131)',
  'rgb(206,73,147)',
  'rgb(46,26,71)',
];

export const REACTION_COLORS = [
  'rgb(249,255,198)',
  'rgb(255,73,108)',
  'rgb(59,89,152)',
  'rgb(104,50,227)',
  'rgb(109,196,240)',
  'rgb(255,104,70)',
  'rgb(228,191,205)',
];

export const REACTION_EMOJIS: Record<string, string> = {
  HAHA: '😂',
  LOVE: '❤️',
  LIKE: '👍',
  WOW: '😯',
  SAD: '😢',
  ANGER: '😡',
  CARE: '🤗',
};

export default APP_NAME;
