const {mongoose, Joi} = require("../configration/utils")

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    deviceToken: {
        type: String,
        min:1,
        required: true,
    },
  
});
const TokenModel = mongoose.model("DeviceTokens", TokenSchema);
  
// Validate tokens
function validateTokens(obj) {
    const schema = Joi.object({
        deviceToken: Joi.string().required().min(1),
    });  
    return schema.validate(obj);
}
  
module.exports = {
    TokenModel,
    validateTokens,
  };