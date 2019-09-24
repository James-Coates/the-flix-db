const express = require('express');
const fs = require('fs');
const path = require('path');
const movieModel = require('../models/movie');

// const appRoot = path.dirname(require.main.filename);

const router = express.Router();
// const movies = JSON.parse(fs.readFileSync(`${appRoot}/public/movies.json`));

router.get('/', (req, res) => {
  movieModel.find()
    .then(allMovies => {
      console.log(allMovies);
      return res.status(201).json(allMovies); // Return all movies as JSON
    })
    .catch(err => res.status(500).send(`Error: ${err}`)); // Simple error handling
});
router.get('/:title', (req, res) => {
  const movieFound = movies.find((movie) => movie.title === req.params.title);
  if (movieFound) {
    return res.status(200).json(movieFound);
  }
  return res.send('Sorry no movie found');
});

module.exports = router;
