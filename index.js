require('dotenv').config();
const express = require("express");
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
app.use("/auth",authRouter);
app.use("/users", userRouter);
app.use("/projects",projectRouter);