const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EntrySchema = new Schema(
  {
    title: String,
    body: { type: String, required: true }
  },
  {
    timestamps: true,
    strict: true
  }
);

var Entry = mongoose.model("Entry", EntrySchema);
module.exports = Entry;
