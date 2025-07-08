import User from "../Model/user.model.js";
import bcrypt from  "bcryptjs";
import genToken from "../Config/token.js";

export const signup = async (req,res) =>
{
    try
    {
       const {name,email,password} = req.body;

       const existEmail = await User.findOne({email:email});

       if(existEmail) 
       {
        return res.status(400).json({message: "Email Already Exists!"});
       }

       if(password.length<6)
        {
          return res.status(400).json({message: "Passoword Must Be Atleast 6 Characters"});
        }

        const hashedPassword = await bcrypt.hash(password,10);  //hashing the password

        const newUser = new User({name,password:hashedPassword,email});

        await newUser.save();

        const token = await genToken(newUser._id); // WE need user id to generate token which is in toke.js

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, 
          sameSite: "strict",
          secure: false 
        });   // token naam se haii aur uske rules haii
        

        return res.status(201).json(newUser);



    }
    catch(err)
    {
      res.status(500).json({ message: "Server error while signing up" });
    }};




export const login = async (req,res) =>
  {
      try
      {
         const {email,password} = req.body;
  
         const currentUser = await User.findOne({email:email});
  
         if(!currentUser) 
         {
          return res.status(400).json({message: "Email Does Not  Exist!"});
         }
  
         const isCorrectPassword = await bcrypt.compare(password,currentUser.password);

         if(!isCorrectPassword) 
         {
           return res.status(400).json({message:"Incorrect Password!"})
         }

          const token = await genToken(currentUser._id);
  
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            sameSite: "strict",
            secure: false 
          });
          
  
            return res.status(201).json(currentUser);
  
  
  
      }
      catch(err)
      {
        res.status(500).json({ message: "Server error while Login" });
      }
  }

  export const logout = async (req,res)=>
  {

    try
    {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout Succesfully" });

    }
    catch(err)
    {
      res.status(500).json({ message: "Logout Error" });
    }
  };