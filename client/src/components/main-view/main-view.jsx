/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// Import components
import { Container, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { HeaderView } from '../header-view/header-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';

const apiUrl = 'https://theflixdb.herokuapp.com'

export class MainView extends React.Component {
  constructor() {
    // Call and initialise superclass constructor
    super();
    this.state = {
      movies: [],
      user: null,
      loginUser: null,
      registerUser: null,
    };
  }

  componentDidMount() {
    // Access token
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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
    axios.get(`${apiUrl}/movies`, {
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
    document.location.reload();
  }

  render() {
    const { movies, user, loginUser, registerUser } = this.state;

    // Check if user logged in and if login selected
    if (!user && loginUser)
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} getMainView={() => this.getMainView()} />;

    // Check if user logged in and if register selected
    if (!user && registerUser)
      return <RegisterView onLoggedIn={user => this.onLoggedIn(user)} getMainView={() => this.getMainView()} />;

    // if (!movies) return <div className="main-view"/>;

    return (

      <Router>
        <div className="main-view">

        <HeaderView
          getRegisterView={() => this.getRegisterView()}
          getLoginView={() => this.getLoginView()}
          user={user}
          logout={() => this.logout()}
        />

        <Route exact path="/" render={() => (
          <Container>
            <Row>
              {movies && movies.length ? (movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))) : (
                <div className="container-fill no-login-text">Please Sign Up or Log in</div>
              )}
            </Row>
          </Container>
        )}/>

        <Route path="/movies/:movieId" render={
          ({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}
        />
        </div>

        <Route path="/genres/:name" render={({match}) => {
          if (!movies.length) return <div className="main-view" />
          return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre}/>
        }}
        />

        <Route path="/directors/:name" render={({match}) => {
          if (!movies.length) return <div className="main-view" />
          return <DirectorView director={movies.find(m => m.director.name === match.params.name).director}/>
        }}
        />

        <Route path="/users/:username" render={() => {
          if (!movies.length) return <div className="main-view" />
          return <ProfileView username={localStorage.user}/>
        }}
        />
      </Router>
    );
  }
}
