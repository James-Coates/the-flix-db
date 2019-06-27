/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { setMovies, setUser } from '../../actions/actions';

// Import components
import MoviesList from '../movies-list/movies-list';
import { Container } from 'react-bootstrap';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import HeaderView from '../header-view/header-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import ProfileView from '../profile-view/profile-view';
import './main-view.scss';

const apiUrl = 'https://theflixdb.herokuapp.com'

class MainView extends React.Component {

  componentDidMount() {
    // Access token
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      console.log('component mounted');
      this.getMovies(accessToken);
    }
  }

  saveUser(user, token) {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
  }

  onLoggedIn(authData) {
    const username = authData.user.username;
    const token = authData.token;
    this.props.setUser(username); // Set user in store
    this.saveUser(username, token) // Store auth token in browser
    this.getMovies(token);
  }

  getMovies(token) {
    axios.get(`${apiUrl}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const movieArray = response.data;
      this.props.setMovies(movieArray); // Set movies in store
    })
    .catch(err => console.log(err));
  }

  render() {

    return (

      <Router>

        <div className="main-view">
        
        <HeaderView />

        <Route exact path="/" render={() => <Container><MoviesList /></Container>} />

        <Route path="/login" render={() => <LoginView onLoggedIn={authData => this.onLoggedIn(authData)} />} />

        <Route path="/register" render={() => <RegisterView onLoggedIn={authData => this.onLoggedIn(authData)} />} />

        <Route path="/movies/:movieId" render={({match}) => <MovieView movieId={ match.params.movieId }/>} />

        <Route path="/genres/:name" render={({match}) => <GenreView genreName={match.params.name}/> } />

        <Route path="/directors/:name" render={({match}) => <DirectorView directorName={match.params.name}/> } />

        <Route path="/users/:username" render={() => {
          return <ProfileView 
            user={localStorage.user} 
            addToFavourites={(movieId) => this.addToFavourites(movieId)} 
            deleteFavouriteMovie={(movieId) => this.deleteFavouriteMovie(movieId)}/>
        }}
        />

        </div>

      </Router>
    );
  }
}

export default connect(null, { setMovies, setUser } )(MainView);
