/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;
    return (
      <div className="movie-card" onClick={() => onClick(movie)}>
        {movie.title}
      </div>
    );
  }
}
