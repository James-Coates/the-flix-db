const express = require('express');
const fs = require('fs');
const path = require('path');

const appRoot = path.dirname(require.main.filename);

const router = express.Router();
const movies = JSON.parse(fs.readFileSync(`${appRoot}/public/movies.json`));

router.get('/', (req, res) => {
  res.json(movies);
});
router.get('/:name', (req, res) => {
  const movieFound = movies.find((movie) => movie.director.name === req.params.name);
  if (movieFound) {
    return res.status(200).json(movieFound.director);
  }
  return res.send('Sorry director not found');
});

module.exports = router;
