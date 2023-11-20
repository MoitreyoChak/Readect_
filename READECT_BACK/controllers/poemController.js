const Reader = require("../models/readerModel");
const { Poem, ShortStory, Article } = require("../models/psaModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const { forcedLogout } = require("../utils/forcedLogout");

exports.getAllPoems = catchAsync(async (req, res) => {
  const poems = await Poem.find().select(
    "-content -updateTime -firstUploadTime"
  );
  res.status(200).json({
    status: "success",
    results: poems.length,
    data: poems,
  });
});

exports.getPoem = catchAsync(async (req, res, next) => {
  const data = await Poem.findById(req.params.poemId).populate({
    path: "comments",
    select: "comments -genreIdentifier -_id",
  });

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.searchPoem = catchAsync(async (req, res, next) => {
  const regexPattern = new RegExp(`^${req.params.title}`);
  const poems = await Poem.find({ title: regexPattern });

  res.status(200).json({
    status: "success",
    results: poems.length,
    data: poems,
  });
});

exports.uploadPoem = catchAsync(async (req, res, next) => {
  const poemObj = {
    userId: req.reader._id,
    name: req.reader.name,
    ...req.body,
  };
  const poem = await Poem.create(poemObj);
  req.updatedGenreId = poem._id;

  next();
});

exports.updatePoem = catchAsync(async (req, res, next) => {
  const poemDoc = await Poem.findById(req.params.genreId);
  if (req.reader._id.toString() !== poemDoc.userId.toString())
    return forcedLogout(req, res, next);

  let updateTime = new Date().toLocaleTimeString();
  const updateObj = { updateTime, ...req.body };
  const updatedReader = await Poem.findByIdAndUpdate(
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

exports.likePoem = catchAsync(async (req, res, next) => {
  await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $push: { likedPoems: req.params.poemId } },
    {
      runValidators: true,
    }
  );

  const result = await Poem.findOneAndUpdate(
    { _id: req.params.poemId },
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

exports.unlikePoem = catchAsync(async (req, res, next) => {
  const result = await Poem.findOneAndUpdate(
    { _id: req.params.poemId },
    { $inc: { likes: -1 } },
    {
      runValidators: true,
      returnDocument: "after",
      projection: { likes: 1, dislikes: 1 },
    }
  );
  await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $pull: { likedPoems: req.params.poemId } },
    {
      runValidators: true,
    }
  );
  res.status(200).json({
    message: "success",
    result,
  });
});

exports.dislikePoem = catchAsync(async (req, res, next) => {
  const result = await Poem.findOneAndUpdate(
    { _id: req.params.poemId },
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

exports.getLikedPoems = catchAsync(async (req, res, next) => {
  const result = await Reader.findById(req.reader._id)
    .select("likedPoems")
    .populate("likedPoems");

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.getReadLaterPoem = catchAsync(async (req, res, next) => {
  const result = await Reader.findById(req.reader._id)
    .select("readLater.poems")
    .populate({
      path: "readLater.poems",
      select: "userId name title likes dislikes uploadDate",
    });
  res.status(200).json({
    message: "success",
    data: result,
  });
});

exports.readLaterPoem = catchAsync(async (req, res, next) => {
  const result = await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $push: { "readLater.poems": req.params.poemId } },
    {
      runValidators: true,
      returnDocument: "after",
    }
  ).select("readLater.poems");

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.removefromReadLaterPoem = catchAsync(async (req, res, next) => {
  const result = await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $pull: { "readLater.poems": req.params.poemId } },
    {
      runValidators: true,
      returnDocument: "after",
    }
  ).select("readLater.poems");
  res.status(200).json({
    message: "success",
    result,
  });
});

exports.deletePoem = catchAsync(async (req, res, next) => {
  await Poem.findByIdAndDelete(req.params.genreId);
  next();
});

exports.testController = catchAsync(async (req, res, next) => {
  // const result = await req.reader.poems.findById(req.params.poemId);
  const result = await Reader.findById(req.params.poemId);

  res.status(200).json({
    message: "success",
    data: { result },
  });
});
