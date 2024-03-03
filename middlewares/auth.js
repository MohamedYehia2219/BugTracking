const jwt=require("jsonwebtoken")
const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY

function isAuthantecated(req,res,next){
    try{
        const token = req.headers.authorization;
        if(!token)
            return res.status(400).json({message:"Token not found !!"});
        let decodedToken = jwt.verify(token, JWT_SECRET_KEY); // decodedToken is object with userId
        if(!decodedToken)
            return res.status(400).json({message:"user is not Authenticated !.."});
        else{
            req.userId=decodedToken.userId;
            next();
        }
    }catch(error){return res.status(400).json({message:error});}
}
module.exports=isAuthantecated;