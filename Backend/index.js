import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./Routes/user.routes.js";
import geminiResponse from "./gemini.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials:true
    }
));

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);




app.listen(port,(req,res)=>
{
    console.log(`listening at port ${port}`);
    connectDB();
});
