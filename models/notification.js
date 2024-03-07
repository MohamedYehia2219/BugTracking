const {mongoose, Joi} = require("../configration/utils")

const notificationSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },
});
const NotificationModel = mongoose.model("Notification", notificationSchema);

// Validate notification
function validateNotification(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    content: Joi.string().trim().min(5).max(1000).required(),
    recievers: Joi.array().required(),
  });
  return schema.validate(obj);
}

module.exports = {
    NotificationModel,
    validateNotification,
};
