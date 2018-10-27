var express = require("express");
var router = express.Router();
const models = require("./../models");
const Entry = models.Entry;

router.post("/", async (req, res, next) => {
  try {
    const { title, body } = req.body;
    let entry = new Entry({ title, body });
    entry = await entry.save();
    res.json(entry);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let entries = await Entry.find();
    entries = entries.map(entry => {
      const { title, createdAt, updatedAt, id } = entry;
      return { title, createdAt, updatedAt, id };
    });
    res.json(entries);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
