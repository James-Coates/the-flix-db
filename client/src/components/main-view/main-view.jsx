/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
// Import components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    // Call and initialise superclass constructor
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://theflixdb.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(err => console.log(err));
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  getMainView() {
    this.setState({
      selectedMovie: null,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    // Before movies are loaded
    if (!movies) return <div className="main-view" />;
    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView movie={selectedMovie} homeButton={() => this.getMainView()} />
        ) : (
          movies.map(movie => <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />)
        )}
      </div>
    );
  }
}
