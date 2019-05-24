const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Movie List
const readMovies = fs.readFileSync('movies.json');
const movies = JSON.parse(readMovies);

// Route all requests for static files to public folder
app.use(express.static(`${__dirname}/public`));

// Use Morgan Middlware for logging requests
app.use(morgan('common'));

// Use body-parser middleware
app.use(bodyParser.json());

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

// Movies Route
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Docs Route
app.get('/documentation', (req, res) => {
  res.sendFile('documentation.html', { root: `${__dirname}/public` });
});

// Temporary API Endpoint Routes

app.get('/movies/:title', (req, res) => {
  const movieTitle = req.params.title;
  res.json(movies.find(movie => movie.title === movieTitle));
});

app.get('/genres/:name', (req, res) => {
  res.send('Successful GET request on genre route');
});

app.get('/directors/:name', (req, res) => {
  res.send('Successful GET request on directors route');
});

app.post('/users/', (req, res) => {
  res.send('Successful POST request for new user');
});

app.put('/users/:id', (req, res) => {
  res.send('Successful PUT request for existing user');
});

app.post('/users/:id/:movie', (req, res) => {
  res.send('Successful POST request for new user associated movie');
});

app.delete('/users/:id/:movie', (req, res) => {
  res.send('Successful DELETE request for user associated movie');
});

app.delete('/users/:id', (req, res) => {
  res.send('Successful DELETE request for existing user');
});

// Listen on 8080
app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Server Has Started');
});
// #endregion ** ROUTES
