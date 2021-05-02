import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Row} from "react-bootstrap";


type gitHubRepo = {
    id: number;
    name: string;
    html_url: string;
};


const getJuliansGitHubRepo = (): Promise<any> => {
    return axios("https://api.github.com/users/juliants/repos").then((res) => {
        if (res.status !== 200) throw new Error("Request failed.");
        return res.data;
    });
};


const Home: React.FC = () => {

    const [gitRepos, setGitRepos] = useState<gitHubRepo[]>([]);
    const [bool, setBool] = useState<boolean>(false);

    useEffect(() => {
        getJuliansGitHubRepo()
            .then((result) => {
                setGitRepos(result);
            })
            .catch(console.error);
    }, []);

    const handleClick = () => {
        setBool(!bool)

    }

    return (


        <div className="Home">
            <Container fluid>
                <h1>MirrorMe</h1>
                <Button onClick={handleClick}>Show Julian's public Git Repos</Button>
                {bool &&
                <Row>
                    {gitRepos.map(x =>
                        <Col>
                            <Card style={{ margin: '20px', width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title>{x.name}</Card.Title>
                                    <Card.Text>
                                        ID: {x.id}
                                    </Card.Text>
                                    <Card.Footer><a href={x.html_url}> {x.html_url}</a></Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>}
            </Container>


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
