const {mongoose, Joi} = require("../configration/utils")

const ProjectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["Open", "In_Progress","Closed"],
      default: "Open",
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
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  });
const ProjectModel = mongoose.model("Project", ProjectSchema);

// Validate project
function validateProject(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    description: Joi.string().trim().min(5).max(1000),
    status: Joi.string().valid("Open", "In_Progress","Closed").required(),
    creator: Joi.string().required(), // Assuming creator is the user's ID
    timeCreated:Joi.date(),
    lastUpdatedBy: Joi.string(), // Optional field
    lastUpdatedAt: Joi.date(), // Optional field
  });
  return schema.validate(obj);
}

module.exports = {
    ProjectModel,
    validateProject,
};
