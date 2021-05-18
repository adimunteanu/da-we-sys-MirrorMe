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

export default APP_NAME;
