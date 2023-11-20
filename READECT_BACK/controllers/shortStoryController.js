const Reader = require("../models/readerModel");
const { ShortStory } = require("../models/psaModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const { forcedLogout } = require("../utils/forcedLogout");

exports.getAllShortStories = catchAsync(async (req, res) => {
  const shortStories = await ShortStory.find().select(
    "-content -updateTime -firstUploadTime"
  );

  res.status(200).json({
    status: "success",
    results: shortStories.length,
    data: shortStories,
  });
});

exports.getShortStory = catchAsync(async (req, res, next) => {
  const shortStory = await ShortStory.findById(
    req.params.shortStoryId
  ).populate({
    path: "comments",
    select: "comments -genreIdentifier -_id",
  });

  res.status(200).json({
    status: "success",
    data: shortStory,
  });
});

exports.searchShortStory = catchAsync(async (req, res, next) => {
  const regexPattern = new RegExp(`^${req.params.title}`);
  const data = await ShortStory.find({ title: regexPattern });

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.uploadShortStory = catchAsync(async (req, res, next) => {
  const shortStoryObj = {
    userId: req.reader._id,
    name: req.reader.name,
    ...req.body,
  };
  const shortStory = await ShortStory.create(shortStoryObj);
  req.updatedGenreId = shortStory._id;

  next();
});

exports.updateShortStory = catchAsync(async (req, res, next) => {
  const shortStoryObj = await ShortStory.findById(req.params.genreId);
  if (req.reader._id.toString() !== shortStoryObj.userId.toString())
    return forcedLogout(req, res, next);

  let updateTime = new Date().toLocaleTimeString();
  const updateObj = { updateTime, ...req.body };
  const updatedReader = await ShortStory.findByIdAndUpdate(
    req.params.genreId,
    updateObj,
    {
      new: true,
      runValidators: true,
    }
  );

  Object.keys(req.body).forEach((key) => {
    if (key === "title") return next();
  });

  res.status(200).json({
    status: "success",
    data: { updatedReader },
  });
});

exports.likeShortStory = catchAsync(async (req, res, next) => {
  await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $push: { likedShortStories: req.params.shortStoryId } },
    {
      runValidators: true,
    }
  );

  const result = await ShortStory.findOneAndUpdate(
    { _id: req.params.shortStoryId },
    { $inc: { likes: 1 } },
    {
      runValidators: true,
      returnDocument: "after",
      projection: { likes: 1, dislikes: 1 },
    }
  );

  res.status(200).json({
    status: "success",
    result,
  });
});

exports.unlikeShortStory = catchAsync(async (req, res, next) => {
  const result = await ShortStory.findOneAndUpdate(
    { _id: req.params.shortStoryId },
    { $inc: { likes: -1 } },
    {
      runValidators: true,
      returnDocument: "after",
      projection: { likes: 1, dislikes: 1 },
    }
  );
  await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $pull: { likedShortStories: req.params.shortStoryId } },
    {
      runValidators: true,
    }
  );
  res.status(200).json({
    message: "success",
    result,
  });
});

exports.dislikeShortStory = catchAsync(async (req, res, next) => {
  const result = await ShortStory.findOneAndUpdate(
    { _id: req.params.shortStoryId },
    { $inc: { dislikes: 1 } },
    {
      runValidators: true,
      returnDocument: "after",
      projection: { likes: 1, dislikes: 1 },
    }
  );

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.getLikedShortStories = catchAsync(async (req, res, next) => {
  const result = await Reader.findById(req.reader._id)
    .select("likedShortStories")
    .populate("likedShortStories");

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.getReadLaterShortStory = catchAsync(async (req, res, next) => {
  const result = await Reader.findById(req.reader._id)
    .select("readLater.shortStories ")
    .populate({
      path: "readLater.shortStories",
      select: "userId name title dislikes tags likes ",
    });

  res.status(200).json({
    message: "success",
    data: result,
  });
});

exports.readLaterShortStory = catchAsync(async (req, res, next) => {
  const result = await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $push: { "readLater.shortStories": req.params.shortStoryId } },
    {
      runValidators: true,
      returnDocument: "after",
    }
  ).select("readLater.shortStories");

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.removefromReadLaterShortStory = catchAsync(async (req, res, next) => {
  const result = await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $pull: { "readLater.shortStories": req.params.shortStoryId } },
    {
      runValidators: true,
      returnDocument: "after",
    }
  ).select("readLater.shortStories");
  res.status(200).json({
    message: "success",
    result,
  });
});

exports.deleteShortStory = catchAsync(async (req, res, next) => {
  await ShortStory.findByIdAndDelete(req.params.genreId);
  next();
});
