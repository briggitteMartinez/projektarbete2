var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./admin/edit', { title: 'EDIT' });
});

router.get('/new', function(req, res, next) {
    res.render('./admin/new', { title: 'NEW' });
  });
  

module.exports = router;
