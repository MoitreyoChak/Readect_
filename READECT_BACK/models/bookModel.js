const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const bookSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: [true, "Please provide the user Id"],
    },
    name: {
      type: String,
      required: [true, "Please provide the userName"],
    },
    title: {
      type: String,
      required: [true, "This post must have a title"],
    },
    chapters: [
      {
        chapterNumber: {
          type: Number,
          required: [true, "Please provide the chapterNumber"],
        },
        chapterName: {
          type: String,
          required: [true, "Please provide the chapterName"],
        },
        content: {
          type: String,
          required: [true, "This post must have some content"],
        },
        updateTime: {
          type: String,
        },
      },
    ],
    tags: {
      type: [String],
    },
    coverImage: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
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
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.virtual("comments", {
  ref: "Review",
  foreignField: "genreIdentifier",
  localField: "_id",
});

exports.Book = mongoose.model("Book", bookSchema);
