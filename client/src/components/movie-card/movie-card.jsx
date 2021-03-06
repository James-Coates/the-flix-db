/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import axios from 'axios';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './movie-card.scss';

function MovieCard( {user, movie, profileView} ){

  const username = user;
  const apiUrl = 'https://theflixdb.herokuapp.com'

  const addToFavourites = (movieId) => {
    console.log(movieId)
    const token = localStorage.token
    axios.post(`${apiUrl}/users/${username}/movies/${movieId}`, {
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(`${movieId} added to favourites`)
    })
    .catch(err => console.log('Can\'t add movie'));
  }

  const deleteFavouriteMovie = (movieId) => {
    console.log(movieId)
    const token = localStorage.token
    axios.delete(`${apiUrl}/users/${username}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(`${movieId} deleted to favourites`)
    })
    .catch(err => console.log('Can\'t delete movie'));
  }

  return (
    <Col md={4} lg={3}>
      <Card className="movie-card">
        <Link to={`/movies/${movie._id}`}>
          <Card.Img variant="top" src={movie.imagePath} />
        </Link>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">
              More <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Button>
          </Link>
          <Button variant="danger" onClick={() => addToFavourites(movie._id)}>
            <FontAwesomeIcon icon={faHeart} />
          </Button>
          {profileView ? (
            <Button variant="warning" onClick={() => deleteFavouriteMovie(movie._id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>  
          ) : (null)}            
        </Card.Body>
      </Card>
    </Col>
  );
}

export default connect(({user}) => ({user}))(MovieCard);