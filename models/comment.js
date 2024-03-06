const {mongoose, Joi} = require("../configration/utils")

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
});
const CommentModel = mongoose.model("Comment", commentSchema);

// Validate comment
function validateComment(obj) {
  const schema = Joi.object({
    content: Joi.string().trim().min(1).required(),
    bugId: Joi.string().required(),
  });
  return schema.validate(obj);
}

module.exports = {
    CommentModel,
    validateComment,
};
