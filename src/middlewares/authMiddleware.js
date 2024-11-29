const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
      let token;
      let authHeader=req.headers.Authorization ||req.headers.authorization; 
      if(authHeader&&authHeader.startswith("Bearer")){
        token=authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"No token authorization denied"});

        }
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
            console.log("The decode user is:",req.user);
            next();
            
        } catch (error) {
            res.status(400).json({message:"Token is not valid" });
        }
      }else{
        return res.status(401).json({message:"No token,authorization"})
      }
};

module.exports=verifyToken;