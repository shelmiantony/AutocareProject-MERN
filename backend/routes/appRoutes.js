import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  profilePage,
} from "../controllers/userController.js";
import protect from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, profilePage);
export default router;
