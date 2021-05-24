import { IonApp } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.scss';
import Header from './components/Header/Header';
import { PAGES } from './globals';
import {
  LandingPage,
  LoginPage,
  OverviewPage,
  RegisterPage,
  RequestPage,
  ScoreboardPage,
  SettingsPage,
} from './pages';
import { selectIsAuthenticated } from './pages/UserController/userControllerSlice';

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
