var express = require('express');
var nunjucks = require('nunjucks')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parseurl = require('parseurl')
var session = require('express-session')

var index = require('./routes/index');
var count = require('./routes/count');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  if (!req.session.views) {
      req.session.views = {}
    }

  var pathname = parseurl(req).pathname
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
    next()
})

app.use(function(req, res, next) {
  console.log("hello");
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/count',count)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
