var express = require("express");
var router = express.Router();
var entries = require("./entries");

router.use("/entries", entries);

module.exports = router;
