// Create web server
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var commentsPath = path.join(__dirname, 'comments.json');

// GET
router.get('/', function(req, res, next) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      var comments = JSON.parse(data);
      res.json(comments);
    }
  });
});

// POST
router.post('/', function(req, res, next) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        else {
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;