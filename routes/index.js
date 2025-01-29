var express = require("express");
var router = express.Router();
var db = require("../public/javascripts/db");

//prepare the database
const Database = require("better-sqlite3");
const data = new Database("./db/products.db", { verbose: console.log });

/* GET home page. */
router.get("/", function (req, res) {
  const rows = data
    .prepare("SELECT * FROM productDetails ORDER BY RANDOM() LIMIT 6")
    .all();

  // Här lägger vi till JSON.parse för att konvertera image-strängen till en array
  rows.forEach((product) => {
    if (product.image) {
      product.image = JSON.parse(product.image); // Omvandla image från JSON-sträng till en array
    }
  });

  console.log("Produkterna:", JSON.stringify(rows, null, 2)); // Kontrollera datan

  res.render("index", { products: rows });
});

module.exports = router;
