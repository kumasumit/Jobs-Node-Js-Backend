import express from 'express';
import { registerActionController } from '../controller/authController.js';


// Router object
const router = express.Router();

// routes
router.post("/register", registerActionController)

// Export the router
export default router;