import express from "express";
import {askToAssistant, getCurrentUser, updateAssistant} from "../Controller/user.controller.js";
import isAuth from "../Middlewares/isAuth.js";
import upload from "../Middlewares/multer.js";



const userRoutes = express.Router();

userRoutes.get("/current",isAuth,getCurrentUser);

  // since ek image aayigi so we use single() function in upload

userRoutes.post("/update",isAuth,upload.single("assistantImage"),updateAssistant);

userRoutes.post("/asktoassistant",isAuth,askToAssistant);

export default userRoutes;