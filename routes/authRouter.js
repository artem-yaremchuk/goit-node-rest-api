import express from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser, updateUserAvatar } from "../controllers/authControllers.js";
import { checkRegisterData, checkLoginData, protect } from "../middlewares/authMiddleware.js";
import { uploadAvatar } from "../middlewares/userMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", checkRegisterData, registerUser);
authRouter.post("/login", checkLoginData, loginUser);
authRouter.get("/current", protect, getCurrentUser);
authRouter.post("/logout", protect, logoutUser);
authRouter.patch("/avatars", protect, uploadAvatar, updateUserAvatar);

export default authRouter;
