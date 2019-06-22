/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
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
                {movie.title}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
