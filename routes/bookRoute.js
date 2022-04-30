const express = require("express");
const {
  createBook,
  updateBook,
  deleteBook,
  getBookDetails,
  likeBook,
  unlikeBook,
} = require("../controllers/bookController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/book/new").post(isAuthenticatedUser, createBook);

router
  .route("/book/:id")
  .put(isAuthenticatedUser, updateBook)
  .delete(isAuthenticatedUser, deleteBook);

router.route("/book/:id").get(getBookDetails);

router.route("/books/like/:id").put(isAuthenticatedUser, likeBook);
router.route("/books/unlike/:id").put(isAuthenticatedUser, unlikeBook);

module.exports = router;
