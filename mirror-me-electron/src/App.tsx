import { IonApp } from '@ionic/react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.scss';
import Header from './components/Header/Header';
import { PAGES } from './globals';
import LandingPage from './pages/LandingPage/LandingPage';
import OverviewPage from './pages/OverviewPage/OverviewPage';
import RequestPage from './pages/RequestPage/RequestPage';
import ScoreboardPage from './pages/ScoreboardPage/ScoreboardPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import LoginPage from './pages/UserController/LoginPage/LoginPage';
import RegisterPage from './pages/UserController/RegisterPage/RegisterPage';

const App = () => {
  const isAuthenticated = true;

  return (
    <IonApp>
      <Router>
        {isAuthenticated && <Header />}
        <Switch>
          <Route path={PAGES.SETTINGS.route} component={SettingsPage} />
          <Route path={PAGES.SCOREBOARD.route} component={ScoreboardPage} />
          <Route path={PAGES.REQUEST.route} component={RequestPage} />
          <Route path={PAGES.OVERVIEW.route} component={OverviewPage} />
          <Route path={PAGES.SIGNUP.route} component={RegisterPage} />
          <Route path={PAGES.LOGIN.route} component={LoginPage} />
          <Route path={PAGES.LANDING.route} component={LandingPage} />
        </Switch>
      </Router>
    </IonApp>
  );
};

export default App;
