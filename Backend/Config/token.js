import  jwt  from "jsonwebtoken";

const genToken = async (userId) =>
{
  try
  {
     const token =  jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "7d"});
     return token;
  }
  catch(err)
  {
    res.status(500).json({ message: "Token Generating error " });
  }
}

export default genToken;