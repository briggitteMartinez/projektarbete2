var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');

//prepare the database
const Database = require('better-sqlite3');
const data = new Database('./db/products.db', { verbose: console.log });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'USER' });
});


// Add a route to handle search requests
router.get('/search', function(req, res, next) {
  var query = req.query.q;
  db.searchProducts(query, function(err, products) {
    if (err) {
      return next(err);
    }
    res.render('user/search-results', { title: 'Search Results', products: products });
  });
});

// Add a route to handle product details requests
router.get('/:slug', function(req, res, next) {
  const slug = req.params.slug;

  const select = data.prepare(`SELECT name, price, description, image, category, size, color, brand, slug FROM productDetails WHERE slug = ?`);
  const product = select.get(slug);

  res.render('user/details', { title: product.name, product: product });
});

module.exports = router;
