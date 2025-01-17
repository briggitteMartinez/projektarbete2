var express = require('express');
var router = express.Router();
const { db } = require('../public/javascripts/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    const rows = db.prepare('SELECT * FROM productDetails').all();
    res.render('./admin/edit', { title: 'EDIT', products: rows }); // Skickar produkterna till edit.ejs
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/new', function(req, res, next) {
    res.render('./admin/new', { title: 'NEW' });
  });

module.exports = router;
