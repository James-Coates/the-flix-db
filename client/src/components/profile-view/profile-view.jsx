import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import MovieCard from '../movie-card/movie-card';
import './profile-view.scss';

import { setUser, setMovies } from '../../actions/actions';

function ProfileView( {movies, user, setUser, setMovies} ) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [favouriteMovies, setFavouriteMovies] = useState('');

  const apiUrl = 'https://theflixdb.herokuapp.com'

  // Load users on mount
  useEffect(() => {
    axios.get(`${apiUrl}/users`)
    .then(response => {
      const userObject = response.data.find(u => u.username === user);
      setUsername(userObject.username);
      setEmail(userObject.email);
      setBirthday(moment(userObject.birthday, moment.ISO_8601).format('YYYY-MM-DD'));
      setPassword(userObject.password);
      setFavouriteMovies(userObject.favouriteMovies);
    })
    .catch(err => {
      if(!user) return null;
      console.log('Can\'t get users')
    });
  }, [user])

  // Handle edit user properties
  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`${apiUrl}/users/${localStorage.user}`, {
      username,
      email,
      birthday,
      password
    }, {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
    .then(response => {
      localStorage.setItem('user', username);
      document.location.reload();
    })
    .catch(e => console.log('Failed to update user'));
  }

  // Delete user
  const handleDelete = e => {
    axios.delete(`${apiUrl}/users/${username}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
    .then(response => {
      console.log('User deleted');
      localStorage.clear();
      setUser('');
      setMovies([]);
    })
    .catch(e => console.log('Failed to delete user'));
  }

  if(!user) return <Redirect to="/" />
  if(!movies.length) return null;

  return(
    <div className="profile-view">
      <Container>
        <Form>
          <Row>
            <Col xs={12}>
              <div className="username__container">
                <h1>{username}</h1>
                <Form.Control 
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="form-input"
                />
              </div>
            </Col>
            <Col md={6}>
            <div className="email">
              Email: 
              <h2>{email}</h2>
              <Form.Control 
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
              />
            </div>
            </Col>
            <Col md={6}>
            <div className="birthday">
              Birthday:
              <h2>
                <Moment format="DD/MM/YYYY">{moment(birthday)}</Moment>
              </h2>
              <Form.Control 
                  type="date"
                  placeholder="Birthday"
                  value={birthday}
                  onChange={e => setBirthday(e.target.value)}
                  className="form-input"
              />
            </div>
            </Col>
            <Col xs={12}>
              <Button onClick={handleSubmit}>Submit</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Form>
        <div className="favourite-movies">
          <h2>Favourite Movies:</h2>
          <Row>
            {Array.from(favouriteMovies).map((movieId) => <MovieCard 
              key={movieId} 
              movie={movies.find(m => m._id === movieId)} 
              profileView = {true} 
              />)}
          </Row>
        </div>
      </Container>
    </div>
  )
} 

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,  
  user: PropTypes.string.isRequired,
}

export default connect(({movies, user}) => ({movies, user}), {setUser, setMovies})(ProfileView);