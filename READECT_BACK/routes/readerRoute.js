const express = require("express");
const router = express.Router();
const {
  getReaders,
  getReader,
  deleteReader,
  follow,
  unfollow,
  getFollowers,
  getFollowings,
} = require("../controllers/readerController");

const {
  signup,
  login,
  protect,
  logout,
  ifLoggedIn,
} = require("../controllers/authController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/ifLoggedIn").get(ifLoggedIn);
router.route("/logout").post(protect, logout);

router.route("/getAllReaders").get(getReaders);
router.route("/").get(protect, getReader).delete(protect, deleteReader);

router.route("/follow/:followId").post(protect, follow);
router.route("/unfollow/:followId").post(protect, unfollow);
router.route("/followers").get(protect, getFollowers);
router.route("/followings").get(protect, getFollowings);

module.exports = router;
