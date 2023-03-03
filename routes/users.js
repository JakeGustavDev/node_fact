const { useColors } = require('debug/src/browser');
const express = require('express');
const router = express.Router();
let User = require('../models/User.js');
const passport = require('passport');

/* GET users listing. */
router.get('/signin', function(req, res, next) {
  console.log(req.session.messages);
  res.render('pages/signin');
});

router.post('/signin',
  passport.authenticate('local', { failureRedirect: '/users/signin', failureMessage: true }),
  function(req, res) {
    let user = new User(req.user);
    user = user.toAuthJSON();
    res.cookie('info',user,{expires: new Date(Date.now() + 1800000)}).redirect('/main');
  });

router.get('/signup', function(req, res, next) {
  res.render('pages/signup');
});

router.post('/signup', function(req, res, next) {
  let info = {
    username: req.body.username,
    email: req.body.email,
    level: req.body.level,
  }
  const user = new User(info);
  user.setPassword(req.body.password);
  user.save();
  res.send('respond with a resource');
});

router.get('/logout', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
