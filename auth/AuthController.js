const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    utils    = require("../utils/utils.js"),
    VerifyToken = require('./VerifyToken'),
    User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    connection = require("../utils/connection.js"),
    config = require('../config/config');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
/**
 * Configure JWT
 */

router.post('/login', function(req, res) {

  connection.connectToDb(function (error) {
    if (error) {
      res.status(500).json({"msg": "error connecting to db", status: "CONNECTION_ERROR"});
      return;
    }
    // If the DB is connected then Create / Update the doc
    connection.getUser(req.body.email, function (err, success) {
      if (err) {
        res.status(500).json({"msg": "error getting info",  status: "CONNECTION_ERROR"});
        return;
      }

      //if (!user) return res.status(404).send('No user found.');
      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    });
  });
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  connection.connectToDb(function (error) {
    if (error) {
      res.status(500).json({"msg": "error connecting to db", status: "CONNECTION_ERROR"});
      return;
    }
    // If the DB is connected then Create / Update the doc
    connection.createUser(req.body.name, req.body, function (err, success) {
      if (err) {
        res.status(500).json({"msg": "error updating info",  status: "CONNECTION_ERROR"});
        return;
      }
      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    });
  });
});

/*router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});*/

module.exports = router;
