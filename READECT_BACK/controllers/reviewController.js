const Reader = require("../models/readerModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const Review = require("../models/reviewModel");

exports.createReview = catchAsync(async (req, res, next) => {
  const reviewObject = {
    genreIdentifier: req.updatedGenreId,
    genreName: req.body.title,
    comments: [],
  };
  const newReview = await Review.create(reviewObject);

  res.status(200).json({
    status: "success",
    data: newReview,
  });
});

exports.getAllReviews = catchAsync(async (req, res) => {
  const data = await Review.find({ genreIdentifier: req.params.genreId });
  console.log(data);
  res.status(200).json({
    status: "success",
    results: data.length,
    data: data[0].comments,
  });
});

exports.postComment = catchAsync(async (req, res, next) => {
  const commentObj = {
    name: req.reader.name,
    email: req.reader.email,
    comment: req.body.comment,
  };
  const Comments = await Review.findOneAndUpdate(
    { genreIdentifier: req.params.genreId },
    { $push: { comments: commentObj } },
    { runValidators: true, returnDocument: "after" }
  );

  res.status(200).json({
    status: "success",
    data: Comments,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const doc = await Review.find({ genreIdentifier: req.params.genreId });
  let comments;
  doc[0].comments.forEach((comment) => {
    if (comment.email === req.reader.email) {
      comment.comment = req.body.comment;
      comment.updateTime = new Date().toLocaleTimeString();
      comments = doc[0].comments;
    }
  });

  const updatedComments = await Review.findOneAndUpdate(
    { genreIdentifier: req.params.genreId },
    { comments },
    { runValidators: true, returnDocument: "after" }
  );

  res.status(200).json({
    status: "success",
    data: updatedComments,
  });
});

exports.updateReviewGenreName = catchAsync(async (req, res) => {
  const updatedReview = await Review.findOneAndUpdate(
    { genreIdentifier: req.params.genreId },
    { genreName: req.body.title },
    { runValidators: true, returnDocument: "after" }
  );

  res.status(200).json({
    message: "success",
    data: { updatedReview },
  });
});

exports.deleteComment = catchAsync(async (req, res) => {
  const result = await Review.findOneAndUpdate(
    { genreIdentifier: req.params.genreId },
    { $pull: { comments: { _id: { $eq: req.params.commentId } } } },
    { runValidators: true, returnDocument: "after" }
  );

  res.status(200).json({
    message: "success",
    data: { result },
  });
});

//deleteReview is hit ONLY when a poem is deleted
exports.deleteReview = catchAsync(async (req, res) => {
  await Review.findOneAndDelete({
    genreIdentifier: req.params.genreId,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
