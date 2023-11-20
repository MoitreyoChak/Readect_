const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcryptjs");

const readerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A reader must have a name"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "please provide a valid email"],
      unique: true,
    },
    likedPoems: {
      type: [Schema.ObjectId],
      ref: "Poem",
    },
    likedShortStories: {
      type: [Schema.ObjectId],
      ref: "ShortStory",
    },
    likedArticles: {
      type: [Schema.ObjectId],
      ref: "Article",
    },
    likedBooks: {
      type: [Schema.ObjectId],
      ref: "Book",
    },
    preferenceTags: {
      type: [String],
      default: [],
    },
    followerCount: {
      type: Number,
      default: 0,
      minimum: 0,
    },
    followers: {
      type: [Schema.ObjectId],
      ref: "Reader",
      default: [],
    },
    followingCount: {
      type: Number,
      default: 0,
      minimum: 0,
    },
    followings: {
      type: [Schema.ObjectId],
      ref: "Reader",
      default: [],
    },
    readLater: {
      poems: {
        type: [Schema.ObjectId],
        ref: "Poem",
        default: [],
      },
      shortStories: {
        type: [Schema.ObjectId],
        ref: "ShortStory",
        default: [],
      },
      articles: {
        type: [Schema.ObjectId],
        ref: "Article",
        default: [],
      },
      books: {
        type: [Schema.ObjectId],
        ref: "Book",
        default: [],
      },
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      // minLength: [8, "The entered password must be at least 8 characters long"],
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

readerSchema.virtual("poems", {
  ref: "Poem",
  foreignField: "userId",
  localField: "_id",
});

readerSchema.virtual("shortStories", {
  ref: "ShortStory",
  foreignField: "userId",
  localField: "_id",
});

readerSchema.virtual("articles", {
  ref: "Article",
  foreignField: "userId",
  localField: "_id",
});

readerSchema.virtual("books", {
  ref: "Book",
  foreignField: "userId",
  localField: "_id",
});

readerSchema.virtual("shortStories", {
  ref: "ShortStory",
  foreignField: "userId",
  localField: "_id",
});

readerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

readerSchema.methods.ifCorrectPassword = function (
  enteredPassword,
  actualPassword
) {
  return bcrypt.compare(enteredPassword, actualPassword);
};

const Reader = mongoose.model("Reader", readerSchema);
module.exports = Reader;
