const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const commentRouter = require("./routes/comments/commentRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const globalErrHandler = require("./middlewares/globalErrHandler");
const isAdmin = require("./middlewares/isAdmin");
require("dotenv").config();
require("./config/dbConnect");

const app = express();

app.use(isAdmin);
//middlewares
app.use(express.json());

//users route
app.use("/api/v1/users", userRouter);

//posts route
app.use("/api/v1/posts", postRouter);

//comments route
app.use("/api/v1/comments", commentRouter);

//categories route
app.use("/api/v1/categories", categoryRouter);

//Error handlers middlewares
app.use(globalErrHandler);

app.use("*", (req, res) => {
  console.log(req.originalUrl);
  res.status(404).json({
    message: `${req.originalUrl} - Route Not Found`,
  });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));
