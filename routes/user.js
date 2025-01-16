var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'USER' });
});

router.get('/search', function(req, res, next) {
  var query = req.query.q;
  db.searchProducts(query, function(err, products) {
    if (err) {
      return next(err);
    }
    res.render('user/search-results', { title: 'Search Results', products: products });
  });
});

module.exports = router;
