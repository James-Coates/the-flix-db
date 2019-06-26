import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = state => {
  const {movies, visibilityFilter, sortColumn} = state;

  let moviesToShow = movies.concat().sort((a,b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0
  })

  if (visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(m => m.title.includes(visibilityFilter))
  };

  return {movies: moviesToShow}
}

function MoviesList(props) {
  const { movies } = props;

  if (!movies || !movies.length) return <div className="main-view" />

  return (
    <div>
      <VisibilityFilterInput />
        <Row>
          {movies.map(m => <MovieCard key={m._id} movie={m} />)}
        </Row>
    </div>
  )
}

export default connect(mapStateToProps)(MoviesList);