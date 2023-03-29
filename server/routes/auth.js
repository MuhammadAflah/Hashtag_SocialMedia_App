import express from "express";
import {
  forgotpassword,
  login,
  verifyEmail,
  resetPassword,
  googleLogin,
  register,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login);
router.post("/verify-email/:id", verifyEmail);
router.post("/forgot-password", forgotpassword);
router.put("/reset-password", resetPassword);

// GOOGLE BUTTON 
router.post("/google-login", googleLogin);


export default router;
