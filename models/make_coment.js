const {mongoose, Joi} = require("../configration/utils")

const makeCommentSchema = new mongoose.Schema({
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
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", 
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});
const MakeCommentModel = mongoose.model("MakeComment", makeCommentSchema);
  
// Validate make comment
function validateMakeComment(obj) {
    const schema = Joi.object({
        userId: Joi.string().required(), // Assuming userId is the user's ID
        bugId: Joi.string().required(), // Assuming bugId is the bug's ID
        commentId: Joi.string().required(), // Assuming commentId is the existing comment's ID
        time: Joi.date(),
    });
    return schema.validate(obj);
}
  
module.exports = {
    MakeCommentModel,
    validateMakeComment,
  };