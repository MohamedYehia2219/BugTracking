const {mongoose, Joi} = require("../configration/utils")

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },
});
const CommentModel = mongoose.model("Comment", commentSchema);

// Validate comment
function validateComment(obj) {
  const schema = Joi.object({
    content: Joi.string().trim().min(5).max(1000).required(),
  });
  return schema.validate(obj);
}

module.exports = {
    CommentModel,
    validateComment,
};
