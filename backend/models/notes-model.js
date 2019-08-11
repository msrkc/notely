const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  lastSaved: { type: Date, default: Date.now() },
  archived: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

noteSchema.set("timestamps", true);

module.exports = mongoose.model("note", noteSchema);
