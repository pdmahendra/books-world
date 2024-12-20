import Book from "../models/bookModel.js";

const addBook = async (req, res) => {
  const { title, author, genre, description, coverImageUrl, language } =
    req.body;
  if (
    !title ||
    !author ||
    !genre ||
    !description ||
    !coverImageUrl ||
    !language
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (req.user.userType !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied, Only admins can add a book." });
  }

  try {
    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(409).json({
        message: "Book with the same title and author already exists",
      });
    }

    const newBook = await Book.create({
      title,
      author,
      genre,
      description,
      coverImageUrl,
      language,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding the book" });
  }
};

const getAllBooks = async (req, res) => {
  const books = await Book.find();

  return res.status(201).json({
    message: "Books fetched successfully",
    books,
  });
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  if (!id) return;
  const book = await Book.findById(id);

  return res.status(201).json({
    message: "book fetched successfully",
    book,
  });
};

export { addBook, getAllBooks, getBookById };
