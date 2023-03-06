var express = require('express');
var router = express.Router();
const auth = require('../config/auth.js');

/* GET home page. */
router.get('/', auth, function (req, res, next) {
  res.render('pages/config', { info: req.cookies.info });
});

module.exports = router;
