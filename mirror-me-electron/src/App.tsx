import { IonApp } from '@ionic/react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.scss';
import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import OverviewPage from './pages/OverviewPage/OverviewPage';
import RequestPage from './pages/RequestPage/RequestPage';
import ScoreboardPage from './pages/ScoreboardPage/ScoreboardPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import LoginPage from './pages/UserController/LoginPage/LoginPage';
import RegisterPage from './pages/UserController/RegisterPage/RegisterPage';
import Routes from './routes';

const App = () => {
  const isAuthenticated = true;
  return (
    <IonApp>
      <Router>
        {isAuthenticated && <Header title="Title" />}
        <Switch>
          <Route path={Routes.SETTINGS} component={SettingsPage} />
          <Route path={Routes.SCOREBOARD} component={ScoreboardPage} />
          <Route path={Routes.REQUEST} component={RequestPage} />
          <Route path={Routes.OVERVIEW} component={OverviewPage} />
          <Route path={Routes.SIGNUP} component={RegisterPage} />
          <Route path={Routes.LOGIN} component={LoginPage} />
          <Route path={Routes.LANDING} component={LandingPage} />
        </Switch>
      </Router>
    </IonApp>
  );
};

export default App;
