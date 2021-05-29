import REDDIT_LOGO from './images/Reddit.jpg';
import INSTAGRAM_LOGO from './images/Instagram.png';

const APP_NAME = 'MirrorMe';

export const PAGES = {
  LANDING: { route: '/', title: '' },
  LOGIN: { route: '/auth/login', title: '' },
  SIGNUP: { route: '/auth/signup', title: '' },
  OVERVIEW: { route: '/home/overview', title: 'Overview' },
  DETAIL: { route: '/home/overview/', title: '{{Company}} Summary' },
  REQUEST: { route: '/home/request', title: 'Requests' },
  SCOREBOARD: { route: '/home/scoreboard', title: 'Scoreboard' },
  SETTINGS: { route: '/home/settings', title: 'Settings' },
};

export const COMPANIES = {
  REDDIT: {
    name: 'Reddit',
    logo: REDDIT_LOGO,
    save_file: 'reddit_data.json',
  },
  INSTAGRAM: {
    name: 'Instagram',
    logo: INSTAGRAM_LOGO,
    save_file: 'instagram_data.json',
  },
};

export const DATA_DIR = 'data/';

export default APP_NAME;
