const mongoose = require("mongoose");

const dictionarySchema = new mongoose.Schema({
  bookName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  authorName: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: { type: String },
});

const dictionaryModel = mongoose.model("dictionary", dictionarySchema);

module.exports = dictionaryModel;
