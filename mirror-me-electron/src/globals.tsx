import React from 'react';
import REDDIT_LOGO from './images/Reddit.jpg';
import INSTAGRAM_LOGO from './images/Instagram.png';
import SummarizedRedditCard from './components/SummarizedCard/CompanyCards/SummarizedRedditCard';
import RedditDetailPage from './pages/DetailPage/RedditDetailPage';

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
    summarized_component: <SummarizedRedditCard />,
    detail_page: RedditDetailPage,
    save_file: 'instagram_data.json',
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
];

export default APP_NAME;
