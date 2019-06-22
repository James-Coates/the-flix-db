/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
// Import components
import { Container, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { HeaderView } from '../header-view/header-view';
import './main-view.scss';

const apiUrl = 'https://theflixdb.herokuapp.com'

export class MainView extends React.Component {
  constructor() {
    // Call and initialise superclass constructor
    super();
    this.state = {
      movies: null,
      selectedMovieId: null,
      user: null,
      loginUser: null,
      registerUser: null,
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleNewHash, false);
    this.handleNewHash();

    // Access token
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  handleNewHash = () => {
    const movieId = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
    this.setState({
      selectedMovieId: movieId[0]
    });
  }

  onMovieClick(movie) {
    // Change hash with movie id
    window.location.hash = '#' + movie._id;
    this.setState({
      selectedMovieId: movie._id,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username,
    });

    // Store auth token in browser
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get(apiUrl + '/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        movies: response.data
      })
    })
    .catch(err => console.log(err));
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    const { movies, selectedMovieId, user, loginUser, registerUser } = this.state;

    // Check if user logged in and if login selected
    if (!user && loginUser)
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} getMainView={() => this.getMainView()} />;

    // Check if user logged in and if register selected
    if (!user && registerUser)
      return <RegisterView onLoggedIn={user => this.onLoggedIn(user)} getMainView={() => this.getMainView()} />;

    const selectedMovie = selectedMovieId && movies ? movies.find(m => m._id === selectedMovieId) : null;

    return (
      <div className="main-view">
        <HeaderView
          getMainView={() => this.getMainView()}
          getRegisterView={() => this.getRegisterView()}
          getLoginView={() => this.getLoginView()}
        />
        
        {selectedMovieId ? (
          <MovieView movie={selectedMovie} getMainView={() => this.getMainView()} />
        ) : (
          <Container>
            <Row>
              {movies ? (movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
              ))) : (
                <div className="container-fill no-login-text">Please Log in</div>
              )}
            </Row>
          </Container>
        )}
      </div>
    );
  }
}
