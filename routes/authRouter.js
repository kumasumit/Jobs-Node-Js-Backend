import express from "express";
import {
  registerActionController,
  loginActionController,
} from "../controller/authController.js";

// Router object
const router = express.Router();

// routes

// Register || POST /api/v1/auth/register
router.post("/register", registerActionController);
// Login || POST /api/v1/auth/login
router.post("/login", loginActionController);
// Export the router
export default router;
