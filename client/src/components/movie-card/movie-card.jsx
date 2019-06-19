/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;
    return (
      <Col md={4} lg={3}>
        <Card className="movie-card">
          <Card.Img variant="top" src={movie.imagePath} onClick={() => onClick(movie)} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Button variant="primary" onClick={() => onClick(movie)}>
              Go somewhere
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
