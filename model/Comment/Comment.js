const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    user: {
      type: Object,
      required: [true, "User id required"],
    },
    description: {
      type: String,
      required: [true, "Comment description is required"],
    },
  },
  { timesStamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
