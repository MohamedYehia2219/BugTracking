const express = require("express");
const tokenRouter = express.Router();
const isAuthantecated=require("../middlewares/auth");
const { TokenModel,validateTokens} = require("../models/device_token")



module.exports={tokenRouter}