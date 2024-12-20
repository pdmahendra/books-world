import Review from "../models/reviewModel.js";
import Book from "../models/bookModel.js";

const submitReview = async (req, res) => {
  const { bookId, comment } = req.body;

  if (!bookId || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const review = await Review.create({
      bookId,
      userId: req.user.id,
      comment,
    });

    return res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while submitting the review" });
  }
};

const getReviewsByBookId = async (req, res) => {
  const { bookId } = req.params;

  try {
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const reviews = await Review.find({ bookId }).populate(
      "userId",
      "fName email"
    );

    return res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching reviews" });
  }
};

const getReviewsByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    const reviews = await Review.find({ userId }).populate(
      "bookId",
      "title author"
    );

    return res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching reviews" });
  }
};

export { submitReview, getReviewsByBookId, getReviewsByUserId };
