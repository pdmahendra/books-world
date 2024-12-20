import { signIn, getUserById } from "../controllers/userController.js";
import { Router } from "express";
import { authUser } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/sign-in", signIn);
router.get("/get-user", authUser, getUserById);

export default router;
