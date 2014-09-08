(function() {
  var app, bodyParser, exports, express, methodOverride, mongoose, port, url;

  require("coffee-script");

  express = require('express');

  app = express();

  mongoose = require('mongoose');

  bodyParser = require('body-parser');

  methodOverride = require('method-override');

  url = require('./config/db').url;

  mongoose.connect(url);

  port = process.env.PORT || 3000;

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use(methodOverride('X-HTTP-Method-Override'));

  app.use(express["static"]("" + __dirname + "/../public"));

  require('./routes')(app, express);

  app.listen(port);

  console.log("Magic happens on port " + port);

  exports = module.exports = app;

}).call(this);
