import React, {useEffect, useState} from "react";
import axios from "axios";
import {Accordion, Button, Card, Col, Container, Nav, Row} from "react-bootstrap";
import "./Home.css"

type gitHubRepo = {
    id: number,
    name: string,
    html_url: string,
};
type reddit = {
    data: {
        children: [{
            data: {
                title: string,
                secure_media: {},
                url_overridden_by_dest: string,

            }
        }]
    }
};

const getJuliansGitHubRepo = (): Promise<any> => {
    return axios("https://api.github.com/users/juliants/repos").then((res) => {
        if (res.status !== 200) throw new Error("Request failed.");
        return res.data;
    });
};

const getTopRedditMemes = (): Promise<any> => {
    return axios("https://www.reddit.com/r/memes/top/.json?count=20").then((res) => {
        if (res.status !== 200) throw new Error("Request failed.");
        return res.data;
    });
};

const Home: React.FC = () => {

    const [gitRepos, setGitRepos] = useState<gitHubRepo[]>([]);
    const [boolGit, setBoolGit] = useState<boolean>(false);

    const [memes, setMemes] = useState<reddit>();

    useEffect(() => {
        getJuliansGitHubRepo()
            .then((result) => {
                setGitRepos(result);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        getTopRedditMemes()
            .then((result) => {
                setMemes(result);
            })
            .catch(console.error);
    }, []);

    const handleClickGit = () => {
        setBoolGit(!boolGit)
    }

    return (

        <div className="Home">
            <Container style={{alignItems: "center"}}>
                <h1>MirrorMe</h1>
                <Button onClick={handleClickGit}>Show Julian's public Git Repos</Button>

                {boolGit &&
                <Row>
                    {gitRepos.map(x =>
                        <Col>
                            <Card style={{margin: '20px', width: '18rem'}}>
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
                </Row>
                }

                <Accordion>
                    <h2 style={{marginTop: "30px"}}>here are some memes for you</h2>

                    {memes?.data.children.map(y => y.data.secure_media == null &&  //filters out videos from what I know
                      <div id="memeDiv" style={{margin: "10px"}}>
                        <Card id="memeCard">
                          <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={y.data.title}>
                                {y.data.title}
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey={y.data.title}>
                            <Card.Body>
                              <img id="image"
                                   src={y.data.url_overridden_by_dest}
                                   alt="it's definitely not a picture, but it's not a gif or a video either... "
                              />
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </div>)
                    }
                </Accordion>

            </Container>

            <Nav id="nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        Empty Link
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        Empty Link
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        Empty Link
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="/">
                        Disabled
                    </a>
                </li>
            </Nav>

        </div>

    );
};

export default Home;
