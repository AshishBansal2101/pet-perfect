const Book = require("../models/bookModel");
const Author = require("../models/authorModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create Book --
exports.createBook = catchAsyncErrors(async (req, res, next) => {
  const author = await Author.findById(req.user.id);

  const book = await Book.create(req.body);

  const addnew = {
    id: book._id,
    title: book.title,
  };

  author.books.push(addnew);
  author.numOfBooks += 1;
  book.author = author._id;
  await author.save({ validateBeforeSave: false });
  await book.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    book,
  });
});

//Get Book Details
exports.getBookDetails = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  res.status(200).json({
    success: true,
    book,
  });
});

// //Update Book

exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    succes: true,
    book,
  });
});

//Delete book

exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  const author = await Author.findById(req.user.id);

  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  await Author.collection.updateOne(
    { _id: author._id },
    { $pull: { books: { id: book._id } } }
  );

  author.numOfBooks -= 1;

  await book.remove();
  await author.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Book Delete Successfully",
  });
});

//Create New like or Update the like
exports.likeBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  const like = {
    user: req.user._id,
  };

  const isLiked = book.likes.find(
    (like) => like.user.toString() === req.user._id.toString()
  );
  if (isLiked) {
    await Book.collection.updateOne(
      { _id: book._id },
      { $pull: { likes: { user: req.user._id } } }
    );
  } else {
    book.likes.push(like);
  }

  await book.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Create New unlike or Update the unlike
exports.unlikeBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  const unlike = {
    user: req.user._id,
  };

  const isunLiked = book.unlikes.find(
    (unlike) => unlike.user.toString() === req.user._id.toString()
  );
  if (isunLiked) {
    await Book.collection.updateOne(
      { _id: book._id },
      { $pull: { unlikes: { user: req.user._id } } }
    );
  } else {
    book.unlikes.push(unlike);
  }
  await book.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
