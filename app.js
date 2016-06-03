var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jquery = require('jquery');
var http = require('http');
var https = require('https');
var server = http.createServer(app);
var querystring = require("querystring");
var Uber = require('uber-api')({server_token: "LIusHuyhM7LK09WU0--UeOiOddvNkx32r8gI-WH2", version:'v1' });

var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var directions = function(start,end) {
  var uberClientId = "5Nqa0As6FN_3VGj-hiS-J3eqUZxfHtdz",
      uberServerToken = "LIusHuyhM7LK09WU0--UeOiOddvNkx32r8gI-WH2"
  var baseURL = "https://maps.googleapis.com/maps/api/directions/json?";
  var key = "&key=AIzaSyChGWDjbou-pETZN7rs1vm_ig9y9H5Bb6A";
  var options = "&mode=transit&transit_mode=rail";

  var googleURL = encodeURI(baseURL + "origin=" + start + "&destination=" + end + options + key);
  https.get(googleURL, function(res) {
      res.on('data', function(d) {
        //process.stdout.write(d);
        });
    
  });
  
// uber.getPriceEstimate(37,-121,37,-121,function(res){
//   console.log(res);
// });
  var lat = 36;
  var lon = -94;
  
  Uber.getProducts(lat, lon, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
});


  console.log(googleURL);


};




app.post('/', function(req,res) {
  console.log(req.body);
  directions(req.body.start,req.body.end);

  // res.render('directions', {title: 'Get directions',
  //                           start: req.body.start,
  //                           end: req.body.end
                          
  //                         });
  //res.send(200);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
