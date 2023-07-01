// models/section.js

const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  customValue: {
    type: Number,
   // required: true,
  },
  subsections: {
    type: [String],
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Section", sectionSchema);
 