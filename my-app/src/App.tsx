import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Jonas from "./pages/jonas";
import OdedTab from "./pages/OdedTab";
import Tia from "./pages/tia";
import AdrianTab from './pages/AdrianTab';



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li>
              <Link to="/" className="nav-link">
                Home
                </Link>
            </li>
            <li>
              <Link to="/Adrian" className="nav-link">
                Adrian
                </Link>
            </li>
            <li>
              <Link to="/Jonas" className="nav-link">
                Jonas
                </Link>
            </li>
            <li>
              <Link to="/Oded" className="nav-link">
                Oded
                </Link>
            </li>
            <li>
              <Link to="/Tia" className="nav-link">
                Tia
                </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Adrian" component={AdrianTab} />
          <Route path="/Jonas" component={Jonas} />
          <Route path="/Oded" component={OdedTab} />
          <Route path="/Tia" component={Tia} />

        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
