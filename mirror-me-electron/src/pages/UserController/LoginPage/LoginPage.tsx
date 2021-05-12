import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import SlidingError from '../../../components/SlidingError/SlidingError';
import './LoginPage.scss';

const LoginPage = () => {
  const history = useHistory();
  const [errorOccured /* , setErrorOccured */] = useState(false);

  const login = () => {
    console.log('Logged in');
  };

  const routeToSignup = () => {
    console.log('Routed to signup');
    history.push('/signup');
  };

  return (
    <div className="LoginPage">
      <Card className="LoginPage__Card">
        <Card.Body>
          <Form className="LoginPage__Form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button
              className="LoginPage__Form-Button"
              variant="primary"
              onClick={login}
            >
              Submit
            </Button>
          </Form>
          <Button variant="link" onClick={routeToSignup}>
            Still not a member?
          </Button>
          <SlidingError
            hidden={!errorOccured}
            text="Invalid email or password!"
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
