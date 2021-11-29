var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const mongoose = require('mongoose');
var errorHandler = require('./app/middleware/error');

// app.use(errorHandler);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var cors = require('cors');
// app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Define Path
global.__base          = __dirname + '/';
global.__path_app      = __base + 'app/';
global.__path_routes  = __path_app + 'routes/';
global.__path_schemas = __path_app + 'schemas/';
global.__path_models= __path_app + 'models/';

app.use('/api/v1', require(__path_routes + 'index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const database = {
  username: "project",
  password: "quanghuy",
  database: "api_project",
}


mongoose.connect(`mongodb+srv://${database.username}:${database.password}@cluster0.hfppr.mongodb.net/${database.database}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', ()=>{
    console.log('OH no Error')
});
db.once('open', ()=> {
    console.log('Connected');
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
