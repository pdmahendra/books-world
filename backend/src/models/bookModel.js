import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    coverImageUrl: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true, 
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
