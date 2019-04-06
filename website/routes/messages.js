var express = require('express');
var router = express.Router();

/* get list of all messages */
router.get('/', function(req, res, next) {
  res.send('GET responce from messages');
});

/* add new message */
router.post('/', function(req, res, next) {
  res.send('POST responce from messages');
});

/* get individual message */
router.get('/:messageID', function(req, res, next) {
  res.send('GET responce for specific message with an ID');
});

module.exports = router;
