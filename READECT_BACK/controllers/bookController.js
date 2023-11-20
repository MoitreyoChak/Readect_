const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const { Book } = require("../models/bookModel");
const Reader = require("../models/readerModel");
const { forcedLogout } = require("../utils/forcedLogout");

exports.getAllBooks = catchAsync(async (req, res) => {
  const books = await Book.find().select(
    "-chapters -updateTime -firstUploadTime"
  );

  res.status(200).json({
    status: "success",
    results: books.length,
    data: books,
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId).populate({
    path: "comments",
    select: "comments -genreIdentifier -_id",
  });

  res.status(200).json({
    status: "success",
    data: book,
  });
});

exports.searchBook = catchAsync(async (req, res, next) => {
  const regexPattern = new RegExp(`^${req.params.title}`);
  const data = await Book.find({ title: regexPattern });

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.uploadBook = catchAsync(async (req, res, next) => {
  const bookObj = {
    userId: req.reader._id,
    name: req.reader.name,
    ...req.body,
  };
  const book = await Book.create(bookObj);
  req.updatedGenreId = book._id;

  next();
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const bookDoc = await Book.findById(req.params.genreId);
  if (req.reader._id.toString() !== bookDoc.userId.toString())
    return forcedLogout(req, res, next);

  let chapters, updateTime;
  bookDoc.chapters.forEach((chapter) => {
    if (chapter._id.toString() === req.params.chapterId.toString()) {
      chapter.chapterNumber = req.body.chapterNumber || chapter.chapterNumber;
      chapter.chapterName = req.body.chapterName || chapter.chapterName;
      chapter.content = req.body.content || chapter.content;

      updateTime = new Date().toLocaleTimeString();
      chapter.updateTime = updateTime;
      chapters = bookDoc.chapters;
    }
  });

  const updatedChapters = await Book.findOneAndUpdate(
    { _id: req.params.genreId },
    { chapters, updateTime },
    { runValidators: true, returnDocument: "after" }
  );

  res.status(200).json({
    status: "success",
    data: { updatedChapters },
  });
});

exports.likeBook = catchAsync(async (req, res, next) => {
  await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $push: { likedBooks: req.params.bookId } },
    {
      runValidators: true,
    }
  );

  const result = await Book.findOneAndUpdate(
    { _id: req.params.bookId },
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

exports.unlikeBook = catchAsync(async (req, res, next) => {
  const result = await Book.findOneAndUpdate(
    { _id: req.params.bookId },
    { $inc: { likes: -1 } },
    {
      runValidators: true,
      returnDocument: "after",
      projection: { likes: 1, dislikes: 1 },
    }
  );
  await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $pull: { likedBooks: req.params.bookId } },
    {
      runValidators: true,
      returnDocument: "after",
      projection: { likedBooks: 1 },
    }
  );
  res.status(200).json({
    message: "success",
    result,
  });
});

exports.dislikeBook = catchAsync(async (req, res, next) => {
  const result = await Book.findOneAndUpdate(
    { _id: req.params.bookId },
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

exports.getLikedBooks = catchAsync(async (req, res, next) => {
  const result = await Reader.findById(req.reader._id)
    .select("likedBooks")
    .populate("likedBooks");

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.getReadLaterBook = catchAsync(async (req, res, next) => {
  const result = await Reader.findById(req.reader._id)
    .select("readLater.books")
    .populate("readLater.books");

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.readLaterBook = catchAsync(async (req, res, next) => {
  const result = await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $push: { "readLater.books": req.params.bookId } },
    {
      runValidators: true,
      returnDocument: "after",
    }
  ).select("readLater.books");

  res.status(200).json({
    message: "success",
    result,
  });
});

exports.removefromReadLaterBook = catchAsync(async (req, res, next) => {
  const result = await Reader.findOneAndUpdate(
    { _id: req.reader._id },
    { $pull: { "readLater.books": req.params.bookId } },
    {
      runValidators: true,
      returnDocument: "after",
    }
  ).select("readLater.books");
  res.status(200).json({
    message: "success",
    result,
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  await Book.findByIdAndDelete(req.params.genreId);
  next();
});
