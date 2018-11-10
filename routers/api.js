var express = require("express");
var router = express.Router();
var entries = require("./entries");

router.use((req, res, next) => {
  if (req.session.password !== process.env.PERSONAL_PASSWORD) {
    next();
  }
  next("route");
});

router.use("/entries", entries);

module.exports = router;
