/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';
import { connect } from 'react-redux';

function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(m => m._id == movieId);

  return(
    <div className="movie-view">
      <Jumbotron>
        <Container>
          <h1 className="movie-view__heading">{movie.title}</h1>
          <Row>
            <Col md={4}>
              <img src={movie.imagePath} alt="Movie Poster" className="movie-poster" />
            </Col>
            <Col md={8}>
              <div className="movie-view__trailer">
                {/* Temporary static iframe */}
                <iframe
                  title="movie-trailer"
                  id="ytplayer"
                  type="text/html"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/GLPJSmUHZvU?autoplay=0"
                  frameBorder="0"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container className="movie-view__info">
        <Row>
          <Col md={8}>
            <h3>Description:</h3>
            <div className="value">{movie.description}</div>
          </Col>
          <Col md={4}>
            <div className="movie-desc__holder">
              <div className="movie-desc">
                <div className="movie-desc__label">Genre:</div>
                <Link to={`/genres/${movie.genre.name}`}>
                  <div className="movie-desc__value">{movie.genre.name}</div>
                </Link>
              </div>
              <div className="movie-desc">
                <div className="movie-desc__label">Director:</div>
                <Link to={`/directors/${movie.director.name}`}>
                  <div className="movie-desc__value">{movie.director.name}</div>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )

}

export default connect(({movies}) => ({movies}))(MovieView)

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
