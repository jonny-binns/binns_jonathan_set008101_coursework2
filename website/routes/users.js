var express = require('express');
var router = express.Router();
var app = require('app');

/* get list of all users */
router.get('/', function(req, res, next) {
  //res.send('GET responce from users');
  userDB.all('SELECT username, password FROM users', function(err, rows) {
    res.json({ "username": row.username, "password" : row.password });
  });
});

/* add new user */
router.post('/', function(req, res, next) {
  const user = {
      userName: req.body.userName,
      password: req.body.password
  };
  res.status(201).json({
      message: 'POST responce from users, user created',
      createdUser: user
  });
});

/* get individual user */
router.get('/:username', function(req, res, next) {
  res.send('GET responce for individual user');
/*
  userDB.get("SELECT username, password FROM users", function(err, row){
      res.json({ row.username: row.password });
  });
*/
});


module.exports = router;
