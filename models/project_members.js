const {mongoose, Joi} = require("../configration/utils")

const ProjectMembersSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", 
      required: true,
    },
});
const ProjectMembersModel = mongoose.model("ProjectMembers", ProjectMembersSchema);

// Validate work on project
function validateWorkOnProject(obj) {
  const schema = Joi.object({
    userId: Joi.string().required(), // Assuming userId is the user's ID
    projectId: Joi.string().required(), // Assuming projectId is the project's ID
  });
  return schema.validate(obj);
}

module.exports = {
    ProjectMembersModel,
    validateWorkOnProject,
};
