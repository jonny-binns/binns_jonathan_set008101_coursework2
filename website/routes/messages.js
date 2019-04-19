var express = require('express');
var router = express.Router();
var app = require('../app');
var path = require('path');


var sqlite3 = require('sqlite3').verbose();
var messageDBPath = path.resolve('message.db');
var messageDB = new sqlite3.Database(messageDBPath);

/* get list of all messages */
router.get('/', function(req, res, next) {
  //res.send('GET responce from messages');
  messageDB.all("SELECT * FROM messages", function(err, row) {
    let data = JSON.stringify(row);
    //console.log(data);
    res.send(data);
    //res.render('home', { name: data });
  });
});

/*get cipher page */
router.get('/:username/cipher', function(req, res, next){
    res.render('ciphermessage');
});

/*get add message page */
router.get('/:username/add', function(req, res, next){
    res.render('writemessage');
});

/* get list of all messages */
router.get('/:username', function(req, res, next) {
  //res.send('GET responce from messages');
  messageDB.all("SELECT * FROM messages WHERE recipient = ?", req.params.username, function(err, row) {
    let data = JSON.stringify(row);
    let user = req.params.username;
    //console.log(data);
    //res.send(data);
    res.render('home', { data: data , username: user });
  });
});

/* add new message */
router.post('/', function(req, res, next) {
  const newMessage = {
      messageID: req.body.messageID,
      recipient: req.body.recipient,
      content: req.body.content,
      sender: req.body.sender
  };
  messageDB.run("INSERT INTO messages (messageID, recipient, content, sender) VALUES (?, ?, ?, ?)", req.body.messageID, req.body.recipient, req.body.content, req.body.sender, function(err, row){
    if(err){
        console.err(err);
        res.status(500);
    }
    else{
        //res.status(202).json({
        //  message: 'POST responce from messages, message created',
      //    createdMessage: newMessage
      //  });
       res.redirect('back');
    }
    //res.end();
  });
});

/* get individual message */
router.post('/view', function(req, res, next) {
  var message = req.body.messageID;
  messageDB.get("SELECT content FROM messages WHERE messageID = ?", message, function(err, row){
    let data = JSON.stringify(row);
      //res.json({ "messageID": row.messageID, "recipient": row.recipient, "content": row.content, "sender": row.sender });
      res.render('viewmessage', { content : data });
  });
});

module.exports = router;
