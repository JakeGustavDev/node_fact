const express = require('express');
const router = express.Router();
let User = require('../models/User.js');
const passport = require('passport');
const {auth, authAdmin} = require('../config/auth.js');

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

router.get('/toogleActive/:_id', authAdmin, async function(req, res, next) {
  let user = await User.findOne({_id:req.params._id});
  user.active = !user.active;
  user.save();
  res.status(200).send('');
});

module.exports = router;
