import express from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../controllers/authControllers.js";
import { checkRegisterData, checkLoginData, protect } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", checkRegisterData, registerUser);
authRouter.post("/login", checkLoginData, loginUser);
authRouter.get("/current", protect, getCurrentUser);
authRouter.post("/logout", protect, logoutUser);

export default authRouter;
