var express = require('express');
var router = express.Router();
const {auth, authAdmin} = require('../config/auth.js');
let User = require('../models/User.js');

/* GET home page. */
router.get('/', authAdmin, async function (req, res, next) {
  let users = await User.find().select({ "username": 1, "active": 1});
  res.render('pages/config', { users:users, info: req.cookies.info, messages: req.flash() });
});

router.post('/signup', authAdmin, async function(req, res, next) {
  try {
    let info = {
      username: req.body.username,
      email: req.body.email,
      level: req.body.level,
      active: true
    }
    const user = new User(info);
    user.setPassword(req.body.password);
    await user.save();
    req.flash('success', 'Usuario guardado');
    res.redirect('/config');
  } catch (error) {
    req.flash('error', 'Usuario o Correo en uso.');
    res.redirect('/config');
  }
});

module.exports = router;
