/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const validator = require('express-validator');
const models = require('./db/models.js');
const restart = require('./db/restart.js');
require('./server/passport.js');

// DB Models
const Movies = models.Movie;
const Users = models.User;

// Connect to Local DB
// mongoose.connect('mongodb://localhost:27017/theFLIXdb', { useNewUrlParser: true }).then(() => {
//   // Restart Database # For testing
//   restart.restartDb(restart.starterMovies, Movies); // Turn on/off as required
//   restart.restartDb(restart.starterUsers, Users); // Turn on/off as required
// });

// Connect to Online DB
mongoose
  .connect(
    'mongodb+srv://theFLIXdb-admin:010192Jac@theflixdb-h8omr.mongodb.net/theFLIXdb?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    // Restart Database # For testing
    // restart.restartDb(restart.starterMovies, Movies); // Turn on/off as required
    // restart.restartDb(restart.starterUsers, Users); // Turn on/off as required
  });

const app = express();

// App Middleware

app.use(express.static(`${__dirname}/public`)); // Route all requests for static files to public folder

app.use(morgan('common')); // Use Morgan Middlware for logging requests

app.use(bodyParser.json()); // Use body-parser middleware

app.use(cors()); // Use CORS - All domains

app.use(validator()); // Use server-side data validation

// Require auth
require('./server/auth.js')(app); // Ensure express is available in auth.js

// Error Handling Middleware
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send('Something Broke');
});

// #region ** ROUTES

// Index Route
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/public` });
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
  Movies.findOne({ 'genre.name': req.params.name })
    .then(movie => {
      // Return genre details only if found else return Not Found.
      if (!movie) return res.status(404).send(`${req.params.name} not found`);
      res.status(201).json(movie.genre);
    })
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Get List of Movies by Director Name
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'director.name': req.params.name })
    .then(movie => {
      // Return director details only if found else return Not Found.
      if (!movie) return res.status(404).send(`${req.params.name} not found`);
      res.status(201).json(movie.director);
    })
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Add New User
app.post('/users', (req, res) => {
  // Data validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('username', 'Username must only contain alphanumeric charachters').isAlphanumeric();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email does not appear to be valid').isEmail();
  // Check validation object for errors
  const errors = req.validationErrors();
  if (errors) return res.status(422).json({ errors });

  const hashedPassword = Users.hashPassword(req.body.password);
  Users.findOne({ username: req.body.username })
    .then(user => {
      // Check if user exists, if not add user
      if (user) return res.status(400).send(`${req.body.username} already exists`);
      Users.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        birthday: req.body.birthday,
      })
        .then(userAdded => res.status(201).json(userAdded)) // Return added user as JSON
        .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
    })
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Modify User
app.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday,
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
        { username: req.params.username },
        { $push: { favouriteMovies: movie._id } }, // Push found movieid to array
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
    { username: req.params.username },
    { $pull: { favouriteMovies: req.params.movieid } },
    { new: true } // Make sure updated document is returned
  )
    .then(modifiedUser => res.status(201).json(modifiedUser)) // Return modified user as JSON
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});

// Delete User Route
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then(user => {
      // Check if user exists and send appropriate response
      if (!user) return res.status(400).send(`${req.params.Username} was not found`); // Return message user not found
      res.status(200).send(`${req.params.username} was deleted.`); // Return message of deletion
    })
    .catch(err => res.status(500).send(`Error: ${err}`));
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on port 3000');
});
// #endregion ** ROUTES
