var express = require("express");
var router = express.Router();

router.post("/", (req, res, next) => {
  const { password } = req.body;
  if (password === process.env.PERSONAL_PASSWORD) {
    req.session.password = password;
    res.redirect("../api/entries");
  }
  next();
});

module.exports = router;
