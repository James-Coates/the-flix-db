const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Movie List
const movies = [
  {
    title: 'RAIDERS OF THE LOST ARK',
    year: '1982',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjA0ODEzMTc1Nl5BMl5BanBnXkFtZTcwODM2MjAxNA@@._V1_SX300.jpg',
  },
  {
    title: 'THE GIRL WITH THE DRAGON TATTOO',
    year: '2011',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTczNDk4NTQ0OV5BMl5BanBnXkFtZTcwNDAxMDgxNw@@._V1_SX300.jpg',
  },
  {
    title: 'Lord of War',
    year: '2005',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTYzZWE3MDAtZjZkMi00MzhlLTlhZDUtNmI2Zjg3OWVlZWI0XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
  },
  {
    title: "Breakfast At Tiffany's",
    year: '1961',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNGEwMTRmZTQtMDY4Ni00MTliLTk5ZmMtOWMxYWMyMTllMDg0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
  },
  {
    title: 'Moon',
    year: '2009',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTgzODgyNTQwOV5BMl5BanBnXkFtZTcwNzc0NTc0Mg@@._V1_SX300.jpg',
  },
  {
    title: 'The Rocketeer',
    year: '1991',
    poster:
      'https://m.media-amazon.com/images/M/MV5BN2ZiMjkwNWYtZWRjNy00YTYxLWI1ZWYtODI0NTA5YTg4ZDIxXkEyXkFqcGdeQXVyNDA5ODIzMDk@._V1_SX300.jpg',
  },
  {
    title: 'Halloween',
    year: '1978',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
  },
  {
    title: 'The Truman Show',
    year: '1998',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
  },
  {
    title: 'Goodfellas',
    year: '1990',
    poster:
      'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    title: 'Pulp Fiction',
    year: '1994',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
];

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
