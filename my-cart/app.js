var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var session = require('express-session');
var app = express();

const hbs = require('hbs');

//this required before view engine setup
hbs.registerPartials(__dirname + '/views/partials');


// view engine setup
//  layoutsDir: path.join(__dirname, "views/layouts"),
//partialsDir: path.join(__dirname, "views/partials"),
app.engine('hbs',expressHbs({
  defaultLayout: 'layout',
   extname:'.hbs',
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'mySuperKey', resave:false, saveUninitialized : false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRouter);  /// This route will come first since if use '/' route first all request will go to indexrouter related to /user
app.use('/', indexRouter);


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
