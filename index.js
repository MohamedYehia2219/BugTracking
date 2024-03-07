require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();

//server listen on port
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.listen(PORT, () =>
  console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//mongo connection
const connectToDB= require("./configration/db");
connectToDB();

//routes
const {authRouter} = require("./routes/auth")
const {userRouter} = require("./routes/user")
const {projectRouter} = require("./routes/project")
const {bugRouter} = require("./routes/bug")
const {categoryRouter} = require("./routes/category")
const {commentRouter} =require("./routes/comment")
const {notificationRouter} =require("./routes/notification")
const {tokenRouter} =require("./routes/deviceToken")
app.use("/auth",authRouter);
app.use("/users", userRouter);
app.use("/projects",projectRouter);
app.use("/bugs", bugRouter);
app.use("/categories",categoryRouter);
app.use("/comments", commentRouter);
app.use("/notifications", notificationRouter);
app.use("/deviceTokens", tokenRouter);

//static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));