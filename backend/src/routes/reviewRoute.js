import { authUser } from "../middlewares/authMiddleware.js";
import {
  getReviewsByBookId,
  getReviewsByUserId,
  submitReview,
} from "../controllers/reviewController.js";

import { Router } from "express";
const router = Router();

router.post("/submit-review", authUser, submitReview);
router.get("/get-review/:bookId", authUser, getReviewsByBookId);
router.get("/get-review", authUser, getReviewsByUserId);

export default router;
