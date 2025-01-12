var express = require('express');
var router = express.Router();

const Datastore = require('better-sqlite3');
const db = new Datastore('./db/products.db');

router.get('/', function(req, res, next) {});

module.exports = router;

prompt("hej")