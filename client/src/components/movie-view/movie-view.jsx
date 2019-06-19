/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Row, Col, Button } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, getMainView } = this.props;

    if (!movie) return null;
    return (
      <div className="movie-view">
        <Jumbotron>
          <Container>
            <h1 className="movie-view__heading">{movie.title}</h1>
            <Row>
              <Col md={4}>
                <img src={movie.imagePath} alt="Movie Poster" className="movie-poster" />
              </Col>
              <Col md={8}>
                <div className="movie-trailer">
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
        <Container>
          <div className="value">{movie.description}</div>
          <div className="movie-genre">
            <div className="label">Genre</div>
            <div className="value">{movie.genre.name}</div>
          </div>
          <div className="movie-director">
            <div className="label">Director</div>
            <div className="value">{movie.director.name}</div>
          </div>
        </Container>
      </div>
    );
  }
}

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
  getMainView: PropTypes.func.isRequired,
};
