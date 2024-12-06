const jwt = require('jsonwebtoken');
const User = require('../model/user-model');

const authMiddleware = async(req,res,next) =>{
      
         const token = req.header('Authorization');
 
   
         if(!token){
               return res.status(401).json({msg:"Unauthorized HTTP, Token not provide"})
         }
         try {
      const jwtToken = token.replace('Bearer' , "").trim()
            const isverified = jwt.verify(jwtToken,hiiamalphaandiamveryintrovertwithmycolligeandfamily);
            const data = await User.findOne({email:isverified.email , id:isverified.id}).select({password:0});
            req.user = data;
            req.token = jwtToken;
            req.userId = data._id;
            next()
         } catch (error) {
               res.status(500).json({msg:error})
         }
         

}


module.exports = authMiddleware;