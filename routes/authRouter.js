import express from "express";
import { registerUser, verifyUser, reverifyUser, loginUser, getCurrentUser, logoutUser, updateUserAvatar } from "../controllers/authControllers.js";
import { checkRegisterData, checkVerifyData, checkLoginData, protect } from "../middlewares/authMiddleware.js";
import { uploadAvatar } from "../middlewares/userMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", checkRegisterData, registerUser);
authRouter.get("/verify/:verificationToken", verifyUser);
authRouter.post("/verify", checkVerifyData, reverifyUser);
authRouter.post("/login", checkLoginData, loginUser);
authRouter.get("/current", protect, getCurrentUser);
authRouter.post("/logout", protect, logoutUser);
authRouter.patch("/avatars", protect, uploadAvatar, updateUserAvatar);

export default authRouter;
