import express from "express";
import { signup,login,logout } from "../Controller/auth.controller.js";

const authRoutes = express.Router();


authRoutes.post("/signup",signup);
authRoutes.post("/signin",login);
authRoutes.get("/logout",logout);


export default authRoutes;