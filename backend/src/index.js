import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db.js";
//import routes
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoute.js";
import bookRoutes from "./routes/bookRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//declare routes
app.use("/test", (req, res) => {
  res.send("Home page");
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1", uploadRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/review", reviewRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
