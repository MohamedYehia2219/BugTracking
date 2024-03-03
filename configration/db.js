const mongoose = require("mongoose");

async function connectToDB() {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb...");
  } catch (error) {
    console.log("connecting failed to mongodb!!: ", error);
  }
}
module.exports = connectToDB;