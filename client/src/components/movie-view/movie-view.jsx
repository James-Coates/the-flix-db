/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

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
        <div className="movie-title">
          <div className="label">Title</div>
          <div className="value">{movie.title}</div>
        </div>
        <div className="movie-description">
          <div className="label">Description</div>
          <div className="value">{movie.description}</div>
        </div>
        <img src={movie.imagePath} alt="Movie Poster" className="movie-poster" />
        <div className="movie-genre">
          <div className="label">Genre</div>
          <div className="value">{movie.genre.name}</div>
        </div>
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value">{movie.director.name}</div>
        </div>
        <button className="back-home" type="submit" onClick={() => getMainView()}>
          Back
        </button>
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
