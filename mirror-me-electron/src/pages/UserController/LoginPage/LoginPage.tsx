import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './LoginPage.css';

const LoginPage = () => {
  const history = useHistory();

  const login = () => {
    console.log('Logged in');
  };

  const routeToSignup = () => {
    console.log('Routed to signup');
    history.push('/signup');
  };

  return (
    <div className="LoginPage">
      <Card className="LoginPage-Card">
        <Card.Body>
          <Form className="LoginPage-Form">
            <Form.Group
              className="LoginPage-Form-Group"
              controlId="formBasicEmail"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control type="" placeholder="Enter email" />
            </Form.Group>

            <Form.Group
              className="LoginPage-Form-Group"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button
              className="LoginPage-Form-Button"
              variant="primary"
              onClick={login}
            >
              Submit
            </Button>
          </Form>
          <Button variant="link" onClick={routeToSignup}>
            Still not a member?
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
