const express = require('express');
const router = express.Router();
let User = require('../models/User.js');
const passport = require('passport');
const {auth, authAdmin} = require('../config/auth.js');

// GET users listing. 
// router.get('/signin', function(req, res, next) {
//   console.log(req.session.messages);
//   res.render('pages/signin');
// });

router.post('/signin',
  passport.authenticate('local', { failureRedirect: '/', failureFlash: true, badRequestMessage : 'Introduzca usuario y contraseña.', }),
  function(req, res) {
    let user = new User(req.user);
    user = user.toAuthJSON();
    res.cookie('info', user,{expires: new Date(Date.now() + 1800000)}).redirect('/main');
  });

router.get('/logout', function(req, res, next) {
  res.send('salir');
});

module.exports = router;
