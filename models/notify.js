const {mongoose, Joi} = require("../configration/utils")

const NotifySchema = new mongoose.Schema({
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    notificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification", 
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
});
const NotifyModel = mongoose.model("Notify", NotifySchema);
  
// Validate notify
function validateNotify(obj) {
    const schema = Joi.object({
      senderUserId: Joi.string().required(), // Assuming senderUserId is the sender user's ID
      receiverUserId: Joi.string().required(), // Assuming receiverUserId is the receiver user's ID
      notificationId: Joi.string().required(), // Assuming notificationId is the existing notification's ID
      time: Joi.date().required(),
    });  
    return schema.validate(obj);
}
  
module.exports = {
    NotifyModel,
    validateNotify,
  };