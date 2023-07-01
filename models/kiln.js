const mongoose = require("mongoose");

const kilnSchema = new mongoose.Schema(
  {
    kiln: {
      type: String,
      required: true,
    },
    data: [
      {
        areaOfWork: {
          type: String,
          required: true,
        },
        customValues: {
          type: [Number],
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } // Add the timestamps option to automatically include createdAt and updatedAt fields
);

const Kiln = mongoose.model("Kiln", kilnSchema);

module.exports = Kiln;
