const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const reviewSchema = new Schema({
  genreName: {
    type: String,
    required: [
      true,
      "Please provide the genre of the post to which the review belongs",
    ],
  },
  genreIdentifier: {
    type: Schema.ObjectId,
    required: [true, "Please provide the id of the post "],
  },
  comments: [
    {
      name: {
        type: String,
        required: [true, "Please provide your userName"],
      },
      email: {
        type: String,
        validate: [validator.isEmail, "Please provide your email address"],
      },
      comment: {
        type: String,
        required: [true, "Please provide your comment!"],
      },
      uploadDate: {
        type: String,
        default: new Date().toLocaleDateString(),
      },
      firstUploadTime: {
        type: String,
        default: new Date().toLocaleTimeString(),
      },
      updateTime: {
        type: String,
      },
    },
  ],
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
