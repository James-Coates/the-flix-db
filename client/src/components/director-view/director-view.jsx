import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

function DirectorView( {movies, directorName} ) {

  if (!movies.length) return null;

  const director = movies.find((m) => m.director.name === directorName).director;

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
  movies: PropTypes.array.isRequired,
  directorName: PropTypes.string.isRequired,
}

export default connect(({movies}) => ({movies}))(DirectorView);