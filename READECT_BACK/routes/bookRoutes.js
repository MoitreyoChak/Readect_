const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  getAllBooks,
  getBook,
  searchBook,
  uploadBook,
  updateBook,
  likeBook,
  unlikeBook,
  dislikeBook,
  getLikedBooks,
  getReadLaterBook,
  readLaterBook,
  removefromReadLaterBook,
  deleteBook,
} = require("../controllers/bookController");
const {
  createReview,
  updateReviewGenreName,
  deleteReview,
} = require("../controllers/reviewController");

const reviewRouter = require("./reviewRouter");

router.route("/").get(getAllBooks).post(protect, uploadBook, createReview);
router.route("/single/:bookId").get(protect, getBook);
router.route("/update/:genreId").delete(protect, deleteBook, deleteReview);

router.route("/search/:title").get(searchBook);

router.route("/:genreId/:chapterId").patch(protect, updateBook);
router.use("/getBook/:genreId/reviews", reviewRouter);

router.route("/:bookId/like").post(protect, likeBook);
router.route("/:bookId/unlike").post(protect, unlikeBook);
router.route("/:bookId/dislike").post(protect, dislikeBook);
router.route("/likedBooks").get(protect, getLikedBooks);

router.route("/getReadLater").get(protect, getReadLaterBook);
router.route("/:bookId/readLater").post(protect, readLaterBook);
router
  .route("/:bookId/removefromReadLater")
  .post(protect, removefromReadLaterBook);

module.exports = router;
