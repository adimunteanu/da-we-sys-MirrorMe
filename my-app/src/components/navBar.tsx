import React from "react";
import { Page } from "../types/index";
import { NavigationService } from "../lib/navigationService";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => NavigationService.navigate(Page.HOME)}
                        >
                            Home
                        </a>
                    </li>
                    <br />
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => NavigationService.navigate(Page.ADRIAN)}
                        >
                            Adrian
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => NavigationService.navigate(Page.JONAS)}
                        >
                            Jonas
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => NavigationService.navigate(Page.ODED)}
                        >
                            Oded
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => NavigationService.navigate(Page.TIA)}
                        >
                            Tia
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
