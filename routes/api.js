var express = require('express');
var router = express.Router();

const Datastore = require('slqite3').verbose();
const db = new Datastore('./db/products.db');

router.get('/', function(req, res, next) {});

module.exports = router;