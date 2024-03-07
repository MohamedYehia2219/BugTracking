const {mongoose, Joi} = require("../configration/utils")

const ProjectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
      unique:true,
    },
    description: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 1000,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Not Started Yet","Closed"],
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

// Validate project craetion
function validateProjectCreation(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    description: Joi.string().trim().min(5).max(1000).required(),
    status: Joi.string().valid("Open", "Not Started Yet","Closed").required(),
    members:Joi.array().required()
  });
  return schema.validate(obj);
}

//validate project updated
function validateProjectUpdated(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200),
    description: Joi.string().trim().min(5).max(1000),
    status: Joi.string().valid("Open", "Not Started Yet","Closed")
  });
  return schema.validate(obj);
}

module.exports = {
    ProjectModel,
    validateProjectCreation,
    validateProjectUpdated
};
