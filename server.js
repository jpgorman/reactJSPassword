(function() {
  var Nerd, NerdSchema, Schema, app, bodyParser, exports, express, methodOverride, mongoose, port, router, url;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  NerdSchema = new Schema({
    name: String
  });

  module.exports = mongoose.model('Nerd', NerdSchema);

  express = require('express');

  router = express.Router();

  Nerd = require('../app/models/nerd');

  module.exports = function(app) {
    router.use(function(req, res, next) {
      console.log('Something is happening.');
      return next();
    });
    router.route('/nerds').post(function(req, res) {
      var nerd;
      nerd = new Nerd();
      nerd.name = req.body.name;
      return nerd.save(function(err) {
        if (err) {
          res.send(err);
          return;
        }
        return res.json({
          message: 'Nerd created!'
        });
      });
    }).get(function(req, res) {
      return Nerd.find(function(err, nerds) {
        if (err) {
          res.send(err);
          return;
        }
        return res.json(nerds);
      });
    });
    router.route('/nerds/:nerd_id').get(function(req, res) {
      return Nerd.findById(req.params.nerd_id, function(err, nerd) {
        if (err) {
          res.send(err);
          return;
        }
        return res.json(nerd);
      });
    }).put(function(req, res) {
      return Nerd.findById(req.params.nerd_id, function(err, nerd) {
        if (err) {
          res.send(err);
          return;
        }
        nerd.name = req.body.name;
        return nerd.save(function(err) {
          if (err) {
            res.send(err);
            return;
          }
          return res.json({
            message: "Nerd '" + nerd.name + "' updated!"
          });
        });
      });
    })["delete"](function(req, res) {
      return Nerd.remove({
        _id: req.params.nerd_id
      }, function(err, nerd) {
        if (err) {
          res.send(err);
          return;
        }
        return res.json({
          message: "Successfully deleted !!!!"
        });
      });
    });
    return app.use('/api', router);
  };

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

  app.use(express["static"]("" + __dirname + "/public"));

  require('./app/routes')(app, express);

  app.listen(port);

  console.log(("" + __dirname + "/public"))
  console.log("Magic happens on port " + port);

  exports = module.exports = app;

  module.exports = {
    url: 'mongodb://meanapp:bishbosh@ds049898.mongolab.com:49898/meanapp'
  };

}).call(this);

//# sourceMappingURL=server.js.map
