var express = require("express");
var router = express.Router();

/* GET sale page */
router.get("/sale", function (req, res) {
  res.render("user/sale"); // OBS! Lägg till "user/" före "sale"
});

module.exports = router;
