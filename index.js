/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const models = require('./models.js');
const restart = require('./restart.js');
require('./passport.js');

// DB Models
const Movies = models.Movie;
const Users = models.User;

// Connect to DB
mongoose.connect('mongodb://localhost:27017/theFLIXdb', { useNewUrlParser: true });

// Restart Database # For testing
restart.restartDb(restart.starterMovies, Movies);
restart.restartDb(restart.starterUsers, Users);

const app = express();

// Route all requests for static files to public folder
app.use(express.static(`${__dirname}/public`));

// Use Morgan Middlware for logging requests
app.use(morgan('common'));

// Use body-parser middleware
app.use(bodyParser.json());

// Require auth
const auth = require('./auth.js')(app); // Ensure express is available in auth.js

// Error Handling Middleware
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send('Something Broke');
});

// #region ** ROUTES

// Index Route
app.get('/', (req, res) => {
  res.send('Welcome to the FLEXdb');
});

// Docs Route
app.get('/documentation', (req, res) => {
  res.sendFile('documentation.html', { root: `${__dirname}/public` });
});

// API Endpoint Routes

// GET all Movies Route
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then(allMovies => res.status(201).json(allMovies)) // Return all movies as JSON
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// GET all Users Route (Extra)
app.get('/users', (req, res) => {
  Users.find()
    .then(allUsers => res.status(201).json(allUsers)) // Return all Users as JSON
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// GET Movie by Title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ title: req.params.title })
    .then(movie => {
      // Return movie as JSON only if found else return Not Found.
      if (!movie) return res.status(404).send(`${req.params.title} not found`);
      res.status(201).json(movie);
    })
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Get Details of Genre
app.get('/genres/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.name })
    .then(movie => {
      // Return genre details only if found else return Not Found.
      if (!movie) return res.status(404).send(`${req.params.name} not found`);
      res.status(201).json(movie.Genre);
    })
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Get List of Movies by Director Name
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.name })
    .then(movie => {
      // Return director details only if found else return Not Found.
      if (!movie) return res.status(404).send(`${req.params.name} not found`);
      res.status(201).json(movie.Director);
    })
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Add New User
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      // Check if user exists, if not add user
      if (user) return res.status(400).send(`${req.body.Username} already exists`);
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      })
        .then(userAdded => res.status(201).json(userAdded)) // Return added user as JSON
        .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
    })
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Modify User
app.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true } // Make sure updated document is returned
  )
    .then(updatedUser => res.status(201).json(updatedUser)) // Return modified user as JSON
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Add User Favourite Movie
app.post('/users/:username/movies/:movieid', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Check if movie exists then find user and push movieid to favouriteMovies
  Movies.findOne({ _id: req.params.movieid })
    .then(movie => {
      Users.findOneAndUpdate(
        { Username: req.params.username },
        { $push: { FavouriteMovies: movie._id } }, // Push found movieid to array
        { new: true } // Make sure updated document is returned
      )
        .then(modifiedUser => res.status(201).json(modifiedUser)) // Return modified user as JSON
        .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
    })
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Delete User Asscociated Movie
app.delete('/users/:username/movies/:movieid', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    { $pull: { FavouriteMovies: req.params.movieid } },
    { new: true } // Make sure updated document is returned
  )
    .then(modifiedUser => res.status(201).json(modifiedUser)) // Return modified user as JSON
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Delete User Route
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.username })
    .then(user => {
      // Check if user exists and send appropriate response
      if (!user) return res.status(400).send(`${req.params.Username} was not found`); // Return message user not found
      res.status(200).send(`${req.params.username} was deleted.`); // Return message of deletion
    })
    .catch(err => res.status(500).send(`Error: ${err}`));
});

// Listen on 8080
app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Server Has Started');
});
// #endregion ** ROUTES
