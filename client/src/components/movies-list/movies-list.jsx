import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import MovieCard from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import SortColumnInput from '../sort-column-input/sort-column-input';

import './movie-list.scss';

const mapStateToProps = state => {
  const {movies, visibilityFilter, sortColumn} = state;

  let moviesToShow = movies.concat().sort((a,b) => {
    const aCompare = sortColumn === 'title' ? a[sortColumn] : a[sortColumn].name;
    const bCompare = sortColumn === 'title' ? b[sortColumn] : b[sortColumn].name;

    if (aCompare.toLowerCase() < bCompare.toLowerCase()) return -1;
    if (aCompare.toLowerCase() > bCompare.toLowerCase()) return 1;
    return 0
  })

  if (visibilityFilter !== '') {
    const query = visibilityFilter.toLowerCase(); 
    moviesToShow = moviesToShow.filter(m => m.title.toLowerCase().includes(query));
  };

  return {movies: moviesToShow}
}

function MoviesList(props) {
  const { movies } = props;

  if (!movies || !movies.length) return(
    <div>
      <Row className="filter__container">
        <Col md={9}><VisibilityFilterInput /></Col>
        <Col md={3}><SortColumnInput /></Col>
      </Row>
    </div>
  )

  return (
    <div>
      <Row className="filter__container">
        <Col md={9}><VisibilityFilterInput /></Col>
        <Col md={3}><SortColumnInput /></Col>
      </Row>
        <Row className="movie-list__container">
          {movies.map(m => <MovieCard key={m._id} movie={m} />)}
        </Row>
    </div>
  )
}

export default connect(mapStateToProps)(MoviesList);