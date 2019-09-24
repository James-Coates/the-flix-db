const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://theFLIXdb-admin:010192Jac@theflixdb-h8omr.mongodb.net/theFLIXdb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log('connected');
    // Restart Database # For testing
    // restart.restartDb(restart.starterMovies, Movies); // Turn on/off as required
    // restart.restartDb(restart.starterUsers, Users); // Turn on/off as required
  });
