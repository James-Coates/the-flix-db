import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

export function GenreView({genre}) {
  return(
    <div className="genre-view">
      <Container>
        <div>{genre.name}</div>
        <div>{genre.description}</div>
      </Container>
    </div>
  );
}