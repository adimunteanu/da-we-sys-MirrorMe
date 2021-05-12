import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import SlidingError from '../../../components/SlidingError/SlidingError';
import './RegisterPage.css';

const RegisterPage = () => {
  const history = useHistory();
  const [errorOccured /* , setErrorOccured */] = useState(false);

  const register = () => {
    console.log('Created a user');
  };

  const routeToLogin = () => {
    console.log('Routed to login');
    history.push('/');
  };

  return (
    <div className="RegisterPage">
      <Card className="RegisterPage__Card">
        <Card.Body>
          <Form className="RegisterPage__Form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button
              className="RegisterPage__Form-Button"
              variant="primary"
              onClick={register}
            >
              Submit
            </Button>
          </Form>
          <Button variant="link" onClick={routeToLogin}>
            Already a member?
          </Button>
          <SlidingError
            hidden={!errorOccured}
            text="User with this email already exists!"
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterPage;
