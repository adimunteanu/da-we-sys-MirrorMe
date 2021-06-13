import { IonApp } from '@ionic/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.scss';
import Header from './components/Header/Header';
import { COMPANIES, PAGES } from './globals';
import {
  LandingPage,
  LoginPage,
  OverviewPage,
  RegisterPage,
  RequestPage,
  ScoreboardPage,
  SettingsPage,
} from './pages';
import {
  selectData,
  selectIsLoadingFiles,
} from './pages/OverviewPage/dataSlice';
import { computeScore } from './pages/ScoreboardPage';
import {
  selectUploadedScore,
  updateScoreThunk,
} from './pages/ScoreboardPage/scoreControllerSlice';
import {
  selectAuthToken,
  selectIsAuthenticated,
  selectNickname,
} from './pages/UserController/userControllerSlice';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasScore = useSelector(selectUploadedScore);
  const isLoadingFiles = useSelector(selectIsLoadingFiles);
  const data = useSelector(selectData);
  const nickname = useSelector(selectNickname);
  const authToken = useSelector(selectAuthToken);

  useEffect(() => {
    if (hasScore && !isLoadingFiles) {
      const score = computeScore(data);
      dispatch(updateScoreThunk({ nickname, score, authToken }));
    }
  }, [isLoadingFiles]);

  return (
    <IonApp>
      <Router>
        {isAuthenticated && <Header />}
        <Switch>
          <Route path={PAGES.SETTINGS.route} component={SettingsPage} />
          <Route path={PAGES.SCOREBOARD.route} component={ScoreboardPage} />
          <Route path={PAGES.REQUEST.route} component={RequestPage} />
          {Object.values(COMPANIES).map((company) => {
            return (
              <Route
                key={company.name}
                path={PAGES.DETAIL.route + company.name.toLowerCase()}
                component={company.detail_page}
              />
            );
          })}
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
