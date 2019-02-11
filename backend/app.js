var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;
console.log("user name is ", process.env.user, process.env.password);
let mongoDbUrl = `mongodb://${process.env.user}:${process.env.password}@ds147659.mlab.com:47659/personal_scheduler`
console.log(mongoDbUrl);
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true
}, (error) => {
  if (error) {
    console.log("Error while connecting to mongodb",error);
  } else {
    console.log("connected to mongodb localhost");
  }
});
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;