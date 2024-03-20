const mongoose = require("mongoose");
const Post = require("../Post/Post");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
    },
    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Editor"],
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // plan: {
    //   type: String,
    //   enum: ["Free", "Premium", "Pro"],
    //   default: "Free",
    // },

    userAward: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//Hooks
//pre-before record is saved
userSchema.pre("findOne", async function (next) {
  const userId = this._conditions._id;

  const posts = await Post.find({ user: userId });

  const lastPost = posts[posts.length - 1];

  const lastPostDate = new Date(lastPost.createdAt);

  const lastPostDateStr = lastPostDate.toDateString();

  userSchema.virtual("lastPostDate").get(function () {
    return lastPostDateStr;
  });

  const currentDate = new Date();

  const diff = currentDate - lastPostDate;

  const diffInDays = diff / (1000 * 3600 * 24);

  if (diffInDays > 30) {
    userSchema.virtual("isInactive").get(function () {
      return true;
    });

    await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
  } else {
    userSchema.virtual("isInactive").get(function () {
      return false;
    });
    await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
  }
  next();
});

// //post- after saving
// userSchema.post("save", function (next) {
//   console.log("Post hook");
// });

//Get fullname
userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

//Get user initials
userSchema.virtual("initials").get(function () {
  return `${this.firstname[0]}${this.lastname[0]}`;
});

//Get posts count
userSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});

//Get followers count
userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

//Get following count
userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

//Get viewers count
userSchema.virtual("viewersCount").get(function () {
  return this.viewers.length;
});

//Get blocked count
userSchema.virtual("blockedCount").get(function () {
  return this.blocked.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
