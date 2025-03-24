var express = require("express");
var router = express.Router();

// Redirect home page to /catalog
router.get("/", function (req, res) {
  res.redirect("/catalog");
});

module.exports = router;
