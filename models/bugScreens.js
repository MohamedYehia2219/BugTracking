const mongoose = require("mongoose");
const Joi = require("joi");

const BugScreensSchema = new mongoose.Schema({
    bug:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bug", 
      required: true,
    },
    screen:{
      type: String,
    },
  });
const BugScreensModel = mongoose.model("BugScreens", BugScreensSchema);

// Validate bug screens
function validateBugScreens(obj) {
  const schema = Joi.object({
    bug: Joi.string().required(), // Assuming bug is the bug's ID
    screen: Joi.string(),
  });
  return schema.validate(obj);
}

module.exports = {
    BugScreensModel,
    validateBugScreens,
};
