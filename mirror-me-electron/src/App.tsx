import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.scss';
import LoginPage from './pages/UserController/LoginPage/LoginPage';
import RegisterPage from './pages/UserController/RegisterPage/RegisterPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={RegisterPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
