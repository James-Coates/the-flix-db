const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

userSchema.statics.hashPassword = password => bcrypt.hashSync(password, 10); // Hash Password Function - Salt Rounds 10
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // Does not like ES6 arrow style functions
}; // Arrow functions explicitly prevent binding this

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
