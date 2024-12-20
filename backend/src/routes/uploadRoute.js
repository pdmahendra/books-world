import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();
import upload from "../middlewares/uploadMiddleware.js";

router.post("/upload", upload.single("image"), uploadImage);

export default router;
