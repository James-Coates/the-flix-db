import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

export function DirectorView( {director} ) {

  return(
    <div className="director-view">
      <Container>
        <div>{director.name}</div>
        <div>{director.bio}</div>
      </Container>
    </div>
  );
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string
  })
}