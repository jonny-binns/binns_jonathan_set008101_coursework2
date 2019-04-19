var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sqlite3 = require('sqlite3').verbose();
var userDBPath = path.resolve('user.db');
var userDB = new sqlite3.Database(userDBPath);
//creates user db and adds in admin for testing
userDB.serialize(function(){
      userDB.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");
      userDB.run("INSERT INTO users (username, password) VALUES (?, ?)", "ADMIN", "TESTPWD")
});
var messageDBPath = path.resolve('message.db');
var messageDB = new sqlite3.Database(messageDBPath);
//creates message db and adds in test message
messageDB.serialize(function(){
      messageDB.run("CREATE TABLE IF NOT EXISTS messages (messageID TEXT, recipient TEXT, content TEXT, sender TEXT)");
      messageDB.run("INSERT INTO messages (messageID, recipient, content, sender) VALUES (?, ?, ?, ?)", "abc", "ADMIN", "hello world", "testname")
});

var messagesRouter = require('./routes/messages');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
