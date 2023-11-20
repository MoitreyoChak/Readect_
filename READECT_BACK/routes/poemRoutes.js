const express = require("express");
const router = express.Router();
const {
  uploadPoem,
  getAllPoems,
  getPoem,
  searchPoem,
  updatePoem,
  likePoem,
  unlikePoem,
  dislikePoem,
  getLikedPoems,
  getReadLaterPoem,
  readLaterPoem,
  removefromReadLaterPoem,
  deletePoem,
  testController,
} = require("../controllers/poemController");
const { protect } = require("../controllers/authController");
const {
  createReview,
  updateReviewGenreName,
  deleteReview,
} = require("../controllers/reviewController");

const reviewRouter = require("./reviewRouter");

router.route("/").get(getAllPoems).post(protect, uploadPoem, createReview);
router.route("/single/:poemId").get(protect, getPoem);
router.use("/reviews/:genreId", reviewRouter);

// router.route("/").post(protect, uploadPoem, createReview);
//genreId
router
  .route("/update/:genreId")
  .patch(protect, updatePoem, updateReviewGenreName)
  .delete(protect, deletePoem, deleteReview);

router.route("/search/:title").get(searchPoem);

router.route("/like/:poemId").post(protect, likePoem);
router.route("/unlike/:poemId").post(protect, unlikePoem);
router.route("/dislike/:poemId").post(protect, dislikePoem);
router.route("/likedPoems").get(protect, getLikedPoems);

router.route("/get/ReadLater").get(protect, getReadLaterPoem);
router.route("/readLater/:poemId").post(protect, readLaterPoem);
router
  .route("/removefromReadLater/:poemId")
  .post(protect, removefromReadLaterPoem);

router.route("/testRoute/:poemId").get(protect, testController);

module.exports = router;
