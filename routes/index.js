var express = require('express');
var router = express.Router();
const {auth, authAdmin} = require('../config/auth.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/signin', {messages: req.flash()});
});

router.get('/main', auth, function (req, res, next) {
  res.render('pages/main', { info: req.cookies.info });
});

module.exports = router;
