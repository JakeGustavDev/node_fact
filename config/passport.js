const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async function (username, password, done) {
  await User.findOne({ username: username })
    .then(function (user) {
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Usuario o contraseña incorrectos.' });
      }
      return done(null, user);
    }).catch(done);
}));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});