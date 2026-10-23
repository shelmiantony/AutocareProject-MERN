import express from "express";
const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/profile", profilePage);
export default router;
