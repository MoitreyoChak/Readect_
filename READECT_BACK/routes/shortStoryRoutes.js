const express = require("express");
const router = express.Router();
const {
  getAllShortStories,
  getShortStory,
  searchShortStory,
  updateShortStory,
  uploadShortStory,
  likeShortStory,
  unlikeShortStory,
  dislikeShortStory,
  getLikedShortStories,
  getReadLaterShortStory,
  readLaterShortStory,
  removefromReadLaterShortStory,
  deleteShortStory,
} = require("../controllers/shortStoryController");
const { protect } = require("../controllers/authController");
const {
  createReview,
  updateReviewGenreName,
  deleteReview,
} = require("../controllers/reviewController");

const reviewRouter = require("./reviewRouter");

router
  .route("/")
  .get(getAllShortStories)
  .post(protect, uploadShortStory, createReview);
router.route("/single/:shortStoryId").get(protect, getShortStory);
router.use("/getShortStory/:genreId/reviews", reviewRouter);

router.route("/search/:title").get(searchShortStory);

router
  .route("/update/:genreId")
  .patch(protect, updateShortStory, updateReviewGenreName)
  .delete(protect, deleteShortStory, deleteReview);

router.route("/like/:shortStoryId").post(protect, likeShortStory);
router.route("/unlike/:shortStoryId").post(protect, unlikeShortStory);
router.route("/dislike/:shortStoryId").post(protect, dislikeShortStory);
router.route("/likedShortStories").get(protect, getLikedShortStories);

router.route("/get/ReadLater").get(protect, getReadLaterShortStory);
router.route("/readLater/:shortStoryId").post(protect, readLaterShortStory);
router
  .route("/removefromReadLater/:shortStoryId")
  .post(protect, removefromReadLaterShortStory);

module.exports = router;
