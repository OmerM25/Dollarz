const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var movies = require('../data.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/movies', (req, res, next) => {
  res.send(JSON.stringify(movies));
})

module.exports = router;
