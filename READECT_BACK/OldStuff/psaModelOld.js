const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const psaSchema = new Schema(
  {
    title: {
      type: String,
      //required: [true, "A reader must have a name"],
    },
    content: {
      type: String,
    },
    ratings: {
      type: [Number],
      default: [0],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
    coverImage: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

psaSchema.virtual("comments", {
  ref: "Review",
  foreignField: "genreIdentifier",
  localField: "_id",
});

module.exports = psaSchema;
