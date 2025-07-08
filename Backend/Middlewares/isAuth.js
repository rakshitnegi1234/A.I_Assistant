import jwt from "jsonwebtoken";

const isAuth  = async (req,res,next) =>
{
   try
   {
     const token = req.cookies.token;
    
     
    

     if(!token)
     {
       return res.status(400).json({message:"Token Not Exist"});
     }

     const verifyToken =  jwt.verify(token,process.env.JWT_SECRET);

     req.userId = verifyToken.userId;

     return next();
   }
   catch(err)
   {
     comsole.log(err);
     return res.status(500).json({message: "isAuth Error Ocurred"});
     
   }

};

export default isAuth;

