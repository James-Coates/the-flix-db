/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './register-view.scss';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = { username, password };
    console.log(user); // #TEST check if user details parsed
    // #TODO Send a request to the server to add user
    // #TODO Then call props.onLoggedIn(username)
    props.onLoggedIn(user.username);
  };

  return (
    <Container fluid className="container-fill">
      <Row className="register__row">
        <Col className="register__col hide-sm" sm={0} md={5}>
          <div className="register__image" />
        </Col>
        <Col className="register__col" md={7}>
          <div className="register__ui">
            <div className="register__head">
              <h1>Sign Up</h1>
              <p>Sign up to use some great features on theFLIXdb.</p>
            </div>
            <div className="register__form">
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
              <Button variant="danger" type="button" block className="form-button" onClick={() => props.getMainView()}>
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
RegisterView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  getMainView: PropTypes.func.isRequired,
};
