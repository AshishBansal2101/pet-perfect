const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updateProfile,
  getAllUser,
  getSingleUser,
  deleteUser,
} = require("../controllers/authorController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/authors/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/authors").get(isAuthenticatedUser, getAllUser);

router
  .route("/authors/:id")
  .get(isAuthenticatedUser, getSingleUser)
  .delete(isAuthenticatedUser, deleteUser);

module.exports = router;
