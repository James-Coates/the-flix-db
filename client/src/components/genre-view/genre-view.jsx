import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

function GenreView({movies, genreName}) {

  if (!movies.length) return null;

  const genre = movies.find((m) => m.genre.name === genreName).genre;

  return(
    
    <div className="genre-view">
      <Container>
        <div>{genre.name}</div>
        <div>{genre.description}</div>
      </Container>
    </div>
  );
}

GenreView.propTypes = {
  movies: PropTypes.array.isRequired,
  genreName: PropTypes.string.isRequired,
}

export default connect(({movies}) => ({movies}))(GenreView);