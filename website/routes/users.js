var express = require('express');
var router = express.Router();

/* get list of all users */
router.get('/', function(req, res, next) {
  res.send('GET responce from users');
});

/* add new user */
router.post('/', function(req, res, next) {
  res.send('POST responce from users');
});

/* get individual user */
router.get('/:userID', function(req, res, next) {
  res.send('GET responce for individual user');
});


module.exports = router;
