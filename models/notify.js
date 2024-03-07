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
        default: Date.now()
    },
});
const NotifyModel = mongoose.model("Notify", NotifySchema);  
module.exports = {
    NotifyModel,
    validateNotify,
  };