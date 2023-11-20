const Reader = require("../models/readerModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const Review = require("../models/reviewModel");

exports.getAllPoems = catchAsync(async (req, res) => {
  const poems = await Reader.aggregate([
    { $unwind: "$poems" },
    { $sort: { ratingsAverage: 1 } },
    { $project: { poems: 1, name: 1, email: 1, _id: 0 } },
  ]);

  res.status(200).json({
    status: "success",
    data: { poems },
  });
});

exports.getPoem = catchAsync(async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.params.poemId);
  const poem = await Reader.aggregate([
    { $unwind: "$poems" },
    { $match: { "poems._id": id } },
    { $project: { poems: 1, _id: 0 } },
  ]);

  const temp = await Reader.populate(poem, {
    path: "comments",
    select: "comments",
  });

  res.status(200).json({
    status: "success",
    temp,
  });
});

exports.uploadPoem = catchAsync(async (req, res, next) => {
  const updatedReader = await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $push: { poems: req.body } },
    { runValidators: true, returnDocument: "after", projection: { poems: 1 } }
  );

  const temp = updatedReader.poems.slice(-1);
  req.updatedPoemId = temp[0]._id;

  next();
});

exports.updatePoem = catchAsync(async (req, res) => {
  let result;
  let poems;
  req.reader.poems.forEach((el) => {
    if (el._id == req.params.poemId) {
      if (req.params.fieldName === "tags") {
        el.tags.push(req.body.tags);
        result = el;
        poems = req.reader.poems;
      } else if (req.params.fieldName === "content") {
        el.content = req.body.content;
        result = el;
        poems = req.reader.poems;
      } else if (req.params.fieldName === "ratings") {
        el.ratings.push(req.body.ratings);
        let sum = 0;
        el.ratings.forEach((i) => (sum += i));
        let avg = sum / el.ratings.length;
        el.ratingsAverage = avg + "";
        result = el;
        poems = req.reader.poems;
      }
    }
  });

  const updatedReader = await Reader.findByIdAndUpdate(
    req.reader._id,
    { poems },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: { result },
  });
});

exports.deletePoem = catchAsync(async (req, res) => {
  const poem = await Reader.updateOne(
    { _id: req.reader._id },
    { $pull: { poems: { _id: { $eq: req.params.poemId } } } }
  );

  res.status(200).json({
    message: "success",
    data: { poem },
  });
});

exports.testController = catchAsync(async (req, res, next) => {
  // const result = await req.reader.poems.findById(req.params.poemId);
  const result = await Reader.findById(req.params.poemId);

  res.status(200).json({
    message: "success",
    data: { result },
  });
});
