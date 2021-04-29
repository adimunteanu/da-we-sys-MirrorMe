import React from "react";

const Home: React.FC = () => {

    return (
        <div className="Home">
            <div className="container">
                <h1>MirrorMe</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="spinner-border text-dark"/>
                    </div>
                    <div className="col-sm-4">

                        <div className="spinner-border text-danger"/>

                    </div>
                    <div className="col-sm-4">
                        <div className="spinner-border text-warning"/>
                    </div>
                </div>
            </div>



            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        Link
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        Link
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        Link
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="/">
                        Disabled
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Home;
