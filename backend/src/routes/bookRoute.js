import { authUser } from "../middlewares/authMiddleware.js";
import {
  addBook,
  getAllBooks,
  getBookById,
} from "../controllers/bookController.js";

import { Router } from "express";
const router = Router();

router.post("/add", authUser, addBook);
router.get("/get-books", authUser, getAllBooks);
router.get("/get-book/:id", authUser, getBookById);

export default router;
