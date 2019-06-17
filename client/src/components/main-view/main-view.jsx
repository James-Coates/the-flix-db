/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
// Import components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';

export class MainView extends React.Component {
  constructor() {
    // Call and initialise superclass constructor
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      loginUser: null,
      registerUser: null,
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

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  getMainView() {
    this.setState({
      selectedMovie: null,
      loginUser: null,
      registerUser: null,
    });
  }

  getLoginView() {
    this.setState({
      loginUser: true,
    });
  }

  getRegisterView() {
    this.setState({
      registerUser: true,
    });
  }

  render() {
    const { movies, selectedMovie, user, loginUser, registerUser } = this.state;

    // Check if user logged in or if login selected
    if (!user && loginUser)
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} homeButton={() => this.getMainView()} />;

    // Check if user logged in or if register selected
    if (!user && registerUser)
      return <RegisterView onLoggedIn={user => this.onLoggedIn(user)} homeButton={() => this.getMainView()} />;

    // Before movies are loaded
    if (!movies) return <div className="main-view" />;
    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView movie={selectedMovie} homeButton={() => this.getMainView()} />
        ) : (
          movies.map(movie => <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />)
        )}
        <button type="button" onClick={() => this.getRegisterView()}>
          Register
        </button>
        <button type="button" onClick={() => this.getLoginView()}>
          Login
        </button>
      </div>
    );
  }
}
