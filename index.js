require('dotenv').config();
const express = require("express");
const app = express();

//mongo connection
const connectToDB= require("./configration/db");
connectToDB();

//server listen on port
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.listen(PORT, () =>
  console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//routes
const {authRouter} = require("./routes/auth")
app.use("/auth",authRouter);