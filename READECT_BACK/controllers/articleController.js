const Reader = require("../models/readerModel");
const { Article } = require("../models/psaModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const { forcedLogout } = require("../utils/forcedLogout");

exports.getAllArticles = catchAsync(async (req, res) => {
  const articles = await Article.find().select(
    "-content -updateTime -firstUploadTime"
  );

  res.status(200).json({
    status: "success",
    results: articles.length,
    data: articles,
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findById(req.params.articleId).populate({
    path: "comments",
    select: "comments -genreIdentifier -_id",
  });
  res.status(200).json({
    status: "success",
    data: article,
  });
});

exports.searchArticle = catchAsync(async (req, res, next) => {
  const regexPattern = new RegExp(`^${req.params.title}`);
  const data = await Article.find({ title: regexPattern });

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.uploadArticle = catchAsync(async (req, res, next) => {
  const ArticleObj = {
    userId: req.reader._id,
    name: req.reader.name,
    ...req.body,
  };
  const article = await Article.create(ArticleObj);
  req.updatedGenreId = article._id;

  next();
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const articleDoc = await Article.findById(req.params.genreId);
  if (req.reader._id.toString() !== articleDoc.userId.toString())
    return forcedLogout(req, res, next);

  let updateTime = new Date().toLocaleTimeString();
  const updateObj = { updateTime, ...req.body };
  const updatedReader = await Article.findByIdAndUpdate(
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
    updatedReader,
  });
});

exports.likeArticle = catchAsync(async (req, res, next) => {
  await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $push: { likedArticles: req.params.articleId } },
    {
      runValidators: true,
    }
  );

  const result = await Article.findOneAndUpdate(
    { _id: req.params.articleId },
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

exports.unlikeArticle = catchAsync(async (req, res, next) => {
  const result = await Article.findOneAndUpdate(
    { _id: req.params.articleId },
    { $inc: { likes: -1 } },
    {
      runValidators: true,
      returnDocument: "after",
      projection: { likes: 1, dislikes: 1 },
    }
  );
  await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $pull: { likedArticles: req.params.articleId } },
    {
      runValidators: true,
    }
  );
  res.status(200).json({
    message: "success",
    result,
  });
});

exports.dislikeArticle = catchAsync(async (req, res, next) => {
  const result = await Article.findOneAndUpdate(
    { _id: req.params.articleId },
    { $inc: { dislikes: 1, likes: 1 } },
    {
      runValidators: true,
      returnDocument: "after",
      projection: { dislikes: 1 },
    }
  );

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.getLikedArticles = catchAsync(async (req, res, next) => {
  const result = await Reader.findById(req.reader._id)
    .select("likedArticles")
    .populate("likedArticles");

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.getReadLaterArticle = catchAsync(async (req, res, next) => {
  const result = await Reader.findById(req.reader._id)
    .select("readLater.articles")
    .populate({
      path: "readLater.articles",
      select: "userId name title likes dislikes uploadDate",
    });

  res.status(200).json({
    message: "success",
    data: result,
  });
});

exports.readLaterArticle = catchAsync(async (req, res, next) => {
  const result = await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $push: { "readLater.articles": req.params.articleId } },
    {
      runValidators: true,
      returnDocument: "after",
    }
  ).select("readLater.articles");

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.removefromReadLaterArticle = catchAsync(async (req, res, next) => {
  const result = await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $pull: { "readLater.Articles": req.params.articleId } },
    {
      runValidators: true,
      returnDocument: "after",
    }
  ).select("readLater.articles");
  res.status(200).json({
    message: "success",
    result,
  });
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  await Article.findByIdAndDelete(req.params.genreId);
  next();
});
