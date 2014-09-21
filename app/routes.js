(function() {
  var Nerd, express, router;

  express = require('express');

  router = express.Router();

  Nerd = require('./models/nerd');

  module.exports = function(app) {
    router.use(function(req, res, next) {
      return next();
    });
    router.route('/nerds').post(function(req, res) {
      var nerd;
      nerd = new Nerd();
      nerd.name = req.body.name;
      nerd.password = req.body.password;
      nerd.name = req.body.name;
      nerd.strength.rate = req.body.rate;
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
        nerd.password = req.body.password;
        nerd.strength.rate = req.body.rate;
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

}).call(this);
