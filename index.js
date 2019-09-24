/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

// Route all requests for static files to public folder
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
// Catchall unhandles errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
const indexRoute = require('./routes/index');
const moviesRoute = require('./routes/movies');
const genresRoute = require('./routes/genres');
const directorsRoute = require('./routes/directors');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/movies', moviesRoute);
app.use('/genres', genresRoute);
app.use('/directors', directorsRoute);
app.use('/users', usersRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on port 3000');
});
