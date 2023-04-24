import express from "express";
import { updateUserActionController } from "../controller/userController.js";
import userAuthMiddleware from "../middlewares/authMiddleware.js";

// Router object
const router = express.Router();

// routes

// Get Users || Get

// Update User || PUT
router.put("/update-user", userAuthMiddleware, updateUserActionController);
// Export the router
export default router;
