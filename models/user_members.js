const {mongoose, Joi} = require("../configration/utils")

const UserMembersSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    }
});
const UserMembersModel = mongoose.model("UserMembers", UserMembersSchema);

// Validate add members
function validateAddMembers(obj) {
  const schema = Joi.object({
    userId: Joi.string().required(), // Assuming userId is the user's ID
    memberId: Joi.string().required(), // Assuming memberId is the member's ID
  });
  return schema.validate(obj);
}

module.exports = {
    UserMembersModel,
    validateAddMembers,
};
