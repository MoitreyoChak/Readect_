const express = require("express");
const router = express.Router();
const {
  uploadArticle,
  getAllArticles,
  getArticle,
  searchArticle,
  updateArticle,
  likeArticle,
  unlikeArticle,
  dislikeArticle,
  getLikedArticles,
  getReadLaterArticle,
  readLaterArticle,
  removefromReadLaterArticle,
  deleteArticle,
} = require("../controllers/articleController");
const { protect } = require("../controllers/authController");
const {
  createReview,
  updateReviewGenreName,
  deleteReview,
} = require("../controllers/reviewController");

const reviewRouter = require("./reviewRouter");

router
  .route("/")
  .get(getAllArticles)
  .post(protect, uploadArticle, createReview);
router.route("/single/:articleId").get(protect, getArticle);
router.use("/getArticle/:genreId/reviews", reviewRouter);

router.route("/search/:title").get(searchArticle);

router
  .route("update/:genreId")
  .patch(protect, updateArticle, updateReviewGenreName)
  .delete(protect, deleteArticle, deleteReview);

router.route("/like/:articleId").post(protect, likeArticle);
router.route("/unlike/:articleId").post(protect, unlikeArticle);
router.route("/dislike/:articleId").post(protect, dislikeArticle);
router.route("/likedArticles").get(protect, getLikedArticles);

router.route("/get/ReadLater").get(protect, getReadLaterArticle);
router.route("/readLater/:articleId").post(protect, readLaterArticle);
router
  .route("/removefromReadLater/:articleId")
  .post(protect, removefromReadLaterArticle);

module.exports = router;
