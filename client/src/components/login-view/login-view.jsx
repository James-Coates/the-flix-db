/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { getMainView } = props;

  const handleSubmit = e => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios.post('https://theflixdb.herokuapp.com/login', {
      username,
      password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);      
    })
    .catch(e => console.log('No such user'));
  };

  return (
    <Container fluid className="container-fill">
      <Row className="login__row">
        <Col className="login__col hide-sm" sm={0} md={5}>
          <div className="login__image" />
        </Col>
        <Col className="login__col" md={7}>
          <div className="login__ui">
            <div className="login__head">
              <h1>Log In</h1>
              <p>Log in to continue to theFLIXdb.</p>
            </div>
            <div className="login__form">
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  type="username"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="form-input"
                />
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-input"
                />
                <Button variant="primary" type="submit" block className="form-button">
                  Submit
                </Button>
              </Form>
              <Button variant="danger" type="button" block className="form-button" onClick={getMainView}>
                Cancel
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// Define Proptypes
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  getMainView: PropTypes.func.isRequired,
};
