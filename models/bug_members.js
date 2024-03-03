const {mongoose, Joi} = require("../configration/utils")

const BugMembersSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    bugId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bug", 
      required: true,
    },
});
const BugMembersModel = mongoose.model("BugMembers", BugMembersSchema);

// Validate assign to bug
function validateAssignToBug(obj) {
  const schema = Joi.object({
    userId: Joi.string().required(), // Assuming userId is the user's ID
    bugId: Joi.string().required(), // Assuming bugId is the bug's ID
  });
  return schema.validate(obj);
}

module.exports = {
    BugMembersModel,
    validateAssignToBug,
};
