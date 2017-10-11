var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.send('you viewed this page ' + req.session.views['/count'] + ' times');
  res.send(req.session);
});

module.exports = router;
