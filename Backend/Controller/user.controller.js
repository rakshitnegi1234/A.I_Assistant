import User from "../Model/user.model.js";
import uploadOnCloudinary from "../Config/cloudinary.js";
import moment from "moment";
import geminiResponse from "../gemini.js";

export const getCurrentUser = async (req,res) =>
{
   try
   {
    const userId = req.userId;
    const user  = await User.findById(userId).select("-password");
   

    if(!user) 
    {
      return res.status(400).json({message:"User Not Found"});
    }

    return res.status(200).json(user);
   }

   catch(err)
   {
    
      return res.status(400).json({message:"CurrentUser Error"});
   }
};


export const updateAssistant = async (req,res) =>
{
   try
   {
      

      const {assistantName, imageUrl} = req.body;
      let assistantImage;

    
    
      if(req.file) 
      {
          assistantImage = await  uploadOnCloudinary(req.file.path);   // to give the path of FILE
      }
      else
      {
           assistantImage = imageUrl;
      }

      const user = await User.findByIdAndUpdate(req.userId,
         {assistantName,assistantImage}
      ,{new:true}).select("-password");

      return res.status(200).json(user);

   }
   catch(err)
   {
     
      return res.status(400).json({message:"Assistant Update Error"});
   }
    

}


export const askToAssistant = async (req,res) =>
{
   try
   {
     const {command} = req.body;
     const user  = await User.findById(req.userId);
     const userName = user.name;
     const assistantName = user.assistantName;
     const result = await geminiResponse(command,assistantName,userName);

// it tries to extract the first JSON object from a string (like the raw output from Gemini or GPT).

     const jsonMatch = result.match(/{[\s\S]*}/);
    

     if(!jsonMatch)
     {
       return res.status(400).json({response: "sorry, cannot Understand"});
     }
     
     const gemResult = JSON.parse(jsonMatch[0]); 

     const type = gemResult.type;

     switch(type)
     {
        case 'get_date' : return res.json(
         {
            type:type,
            userInput : gemResult.userInput,
            response: `current date is ${moment().format("YYYY-MM-DD")}`
         });

         case  'get_time':
            return res.json({
              type,
              userInput: gemResult.userInput,
              response: ` current time is ${moment().format("hh:mm A")}`
            });

      
         case 'get_day':
           return res.json({
             type,
             userInput: gemResult.userInput,
             response:`today is ${moment().format("dddd")}`
           });

         case 'get_month':
           return res.json({
             type,
             userInput:gemResult.userInput,
             response:`today is ${moment().format("MMMM")}`
           });

      case 'Google Search':
       case 'Youtube':
       case 'youtube_play':
       case 'general':
       case "calculator_open":
       case "instagram_open":
       case "facebook_open":
       case "weather-show":
       case "joke" :
      case  "greeting":   
      case "creator":
      case "not_understood":

  return res.json({
    type,
    userInput: gemResult.userInput,
    response: gemResult.response,
  })

    default : 
    return res.status(400).json({response: "I did not understand"});
     }
   }

   

   catch (err) {
      console.log(err);
   
      return res.status(500).json({ response: "Ask Assistant   Error" });
    }
    
}

