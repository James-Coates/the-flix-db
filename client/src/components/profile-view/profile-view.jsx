import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { MovieCard } from '../movie-card/movie-card';
import './profile-view.scss';

export function ProfileView( props ) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // const [edit, setEdit] = useState('');
  const [favouriteMovies, setFavouriteMovies] = useState('');

  const {movies, addToFavourites, deleteFavouriteMovie} = props;
  const apiUrl = 'https://theflixdb.herokuapp.com'

    // Load users on mount
    useEffect(() => {
      axios.get(`${apiUrl}/users`)
      .then(response => {
        const user = response.data.find(u => u.username === props.user);
        setUsername(user.username);
        setEmail(user.email);
        setBirthday(moment(user.birthday, moment.ISO_8601).format('YYYY-MM-DD'));
        setFavouriteMovies(user.favouriteMovies);
      })
      .catch(err => console.log('Can\'t get users'));
    }, [props.user])

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
              <div className="favourite-movies">
                <h2>Favourite Movies:</h2>
                <Row>
                  {Array.from(favouriteMovies).map((movieId) => <MovieCard 
                    key={movieId} 
                    movie={movies.find(m => m._id === movieId)} 
                    addToFavourites={(movieId) => addToFavourites(movieId)}
                    deleteFavouriteMovie={(movieId) => deleteFavouriteMovie(movieId)}
                    profileView = {true} 
                    />)}
                </Row>
              </div>
          </Row>
        </Form>
      </Container>
    </div>
  )
} 