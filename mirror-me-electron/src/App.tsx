import { IonApp } from '@ionic/react';
import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
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
import { RootState } from './store';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: selectIsAuthenticated(state.userControl),
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const App: FunctionComponent<Props> = (props: Props) => {
  const { isAuthenticated } = props;

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

export default connector(App);
