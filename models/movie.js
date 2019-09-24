const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: {
    name: String,
    description: String,
  },
  director: {
    name: String,
    bio: String,
    birthYear: Date,
    deathYear: Date,
  },
  actors: [String],
  impagePath: String,
  featured: Boolean,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
