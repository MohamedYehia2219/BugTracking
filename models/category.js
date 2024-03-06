const {mongoose, Joi} = require("../configration/utils")

const categorySchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
});
const CategoryModel = mongoose.model("Category", categorySchema);

// Validate category
function validateCategory(obj) {
  const schema = Joi.object({
    categories: Joi.array().required(),
  });
  return schema.validate(obj);
}

module.exports = {
    CategoryModel,
    validateCategory,
};
