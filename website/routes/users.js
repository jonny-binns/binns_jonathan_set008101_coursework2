var express = require('express');
var router = express.Router();
var app = require('../app');
var path = require('path');
var fs = require('fs');
var resJSON = require("../userRes.json");

var sqlite3 = require('sqlite3').verbose();
var userDBPath = path.resolve('user.db');
var userDB = new sqlite3.Database(userDBPath);

/* get list of all users */
router.get('/', function(req, res, next) {
    userDB.get("SELECT * FROM users", function(err, row) {
      //row.forEach(function(row) {
      //res.send({ "username": row.username, "password" : row.password });
      let data = JSON.stringify(row);
      fs.writeFileSync('userRes.json', data)
      console.log(data);
      res.json(resJSON);
  });
});

/* add new user */
router.post('/', function(req, res, next) {
  const user = {
      username: req.body.username,
      password: req.body.password
  };
  userDB.run("INSERT INTO users (username, password) VALUES (?, ?)", req.body.username, req.body.password, function(err, row){
    if(err){
        console.err(err);
        res.status(500);
    }
    else{
        res.status(202).json({
          message: 'POST responce from users, user created',
          createdUser: user
        });
    }
    res.end();
  });
});

/* get individual user */
router.get('/:username', function(req, res, next) {
  var user = req.params.username;
  userDB.get("SELECT * FROM users WHERE username = ?", user, function(err, row){
      res.json({ "username": row.username, "password" : row.password });
  });
});


module.exports = router;
