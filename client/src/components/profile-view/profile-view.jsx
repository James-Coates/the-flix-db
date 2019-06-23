import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export function ProfileView( props ) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [edit, setEdit] = useState('');

  const apiUrl = 'https://theflixdb.herokuapp.com'

    // Load users on mount
    useEffect(() => {
      axios.get(`${apiUrl}/users`)
      .then(response => {
        const user = response.data.find(u => u.username === localStorage.user);
        setUsername(user.username);
        setEmail(user.email);
        setBirthday(user.birthday);
      })
      .catch(err => console.log('Can\'t get users'));
    }, [])

  return(
    <div className="profile-view">
      <Container>
        <Form>
          <Row>
            <Col md={6}>
            <div className="username">
              {username}
              <Form.Control 
                  type="username"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="form-input"
              />
            </div>
            <div className="email">
              {email}
              <Form.Control 
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
              />
            </div>
            <div className="birthday">
              {birthday}
              <Form.Control 
                  type="date"
                  placeholder="Birthday"
                  value={birthday}
                  onChange={e => setBirthday(e.target.value)}
                  className="form-input"
              />
            </div>
            </Col>
            <Col md={6}>Favourite Movies</Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
} 

ProfileView.propTypes = {
  user: PropTypes.string.isRequired
}