var express = require('express');
var router = express.Router();

/* get list of all messages */
router.get('/', function(req, res, next) {
  res.send('GET responce from messages');
});

/* add new message */
router.post('/', function(req, res, next) {
  const newMessage = {
      messageID: req.body.messageID,
      recipient: req.body.recipient,
      content: req.body.content,
      sender: req.boy.content
  };
  res.status(201).json({
      message: 'POST responce from messages, message created',
      ceatedMessage: newMessage
  });
});

/* get individual message */
router.get('/:messageID', function(req, res, next) {
  res.send('GET responce for specific message with an ID');
});

module.exports = router;
