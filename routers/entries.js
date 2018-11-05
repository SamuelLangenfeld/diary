var express = require("express");
var router = express.Router();
const models = require("./../models");
const Entry = models.Entry;

const entryToJSON = entryObj => {
  const { title, createdAt, updatedAt, id, body } = entryObj;
  return { title, createdAt, updatedAt, id, body };
};

router.post("/:id", async (req, res, next) => {
  try {
    let entry = await Entry.findById(req.params.id);
    const { title, body } = req.body;
    entry.title = title;
    entry.body = body;
    entry = await entry.save();
    entry = entryToJSON(entryObj);
    res.json(entry);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, body } = req.body;
    let entry = new Entry({ title, body });
    entry = await entry.save();
    entry = entryToJSON(entry);
    res.json(entry);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let entry = await Entry.findById(req.params.id);
    entry = entryToJSON(entry);
    res.json(entry);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let entries = await Entry.find().sort({ createdAt: -1 });
    entries = entries.map(entry => entryToJSON(entry));
    res.json(entries);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let entry = await Entry.findById(req.params.id);
    await entry.remove();
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
