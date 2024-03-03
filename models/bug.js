const {mongoose, Joi} = require("../configration/utils")

const BugSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },
    status: {
      type: String,
      required: true,
      enum: ["To_Do", "Done", "In_Progress"],
      default: "To_Do",
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    severity: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timeCreated: {
      type: Date,
      default: Date.now,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", 
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: true,
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
});
const BugModel = mongoose.model("Bug", BugSchema);

// Validate bug
function validateBug(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    description: Joi.string().trim().min(5).max(1000).required(),
    status: Joi.string().valid("To_Do", "Done", "In_Progress").required(),
    priority: Joi.string().valid("Low", "Medium", "High").required(),
    severity: Joi.string().valid("Low", "Medium", "High").required(),
    creator: Joi.string().required(), // Assuming creator is the user's ID
    timeCreated:Joi.date(),
    project: Joi.string().required(), // Assuming project is the project's ID
    category: Joi.string().required(), // Assuming category is the category's ID
    lastUpdatedBy: Joi.string(), // Optional field
    lastUpdatedAt: Joi.date(), // Optional field
  });
  return schema.validate(obj);
}

module.exports = {
    BugModel,
    validateBug,
};
