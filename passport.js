/* eslint-disable no-console */
const passport = require('passport');
const passportJWT = require('passport-jwt');
const passportLocal = require('passport-local');
const Models = require('./models.js');

// User model
const Users = Models.User;

// Define passport strategies
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, callback) => {
      console.log(`${username}  ${password}`);
      Users.findOne({ username })
        .then(user => {
          if (!user) {
            console.log('Incorrect username');
            return callback(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validatePassword(password)) {
            console.log('Incorrect password');
            return callback(null, false, { message: 'Incorrect password.' });
          }
          console.log('Finished!');
          return callback(null, user);
        })
        .catch(err => callback(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'poppydog',
    },
    (jwtPayload, callback) =>
      Users.findById(jwtPayload._id)
        .then(user => callback(null, user))
        .catch(err => callback(err))
  )
);
