const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "Author",
        required: true,
      },
    },
  ],
  unlikes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "Author",
        required: true,
      },
    },
  ],
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "Author",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
