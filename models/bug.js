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
      enum: ["To Do", "Done", "In Progress"],
      default: "To Do",
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low Priority", "Medium Priority", "High Priority"],
      default: "Medium Priority",
    },
    severity: {
      type: String,
      required: true,
      enum: ["Low Severity", "Medium Severity", "High Severity"],
      default: "Medium Severity",
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

// Validate bug creation
function validateBugCreation(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    description: Joi.string().trim().min(5).max(1000).required(),
    status: Joi.string().valid("To Do", "Done", "In Progress").required(),
    priority: Joi.string().valid("Low Priority", "Medium Priority", "High Priority").required(),
    severity: Joi.string().valid("Low Severity", "Medium Severity", "High Severity").required(),
    project: Joi.string().required(), // Assuming project is the project's ID
    category: Joi.string().required(), // Assuming category is the category's ID
    members:Joi.array().required(),
    screens:Joi.array().required(),
  });
  return schema.validate(obj);
}

// Validate bug updating
function validateBugUpdating(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200),
    description: Joi.string().trim().min(5).max(1000),
    status: Joi.string().valid("To Do", "Done", "In Progress"),
    priority: Joi.string().valid("Low Priority", "Medium Priority", "High Priority"),
    severity: Joi.string().valid("Low Severity", "Medium Severity", "High Severity"),
    category: Joi.string(), // Assuming category is the category's ID
  });
  return schema.validate(obj);
}

module.exports = {
    BugModel,
    validateBugCreation,
    validateBugUpdating
};
