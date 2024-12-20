import axios from "../../middleware/axiosMiddleware.js";
import { API } from "../index";

const addNewBook = async ({ payload }) => {
  const response = await axios.post(`${API.book.addBook}`, payload);
  return response.data;
};

const getAllBooks = async () => {
  const response = await axios.get(`${API.book.getAllBooks}`);
  return response.data.books;
};

const getBookById = async (id) => {
  const response = await axios.get(`${API.book.getBookById}/${id}`);  
  return response.data.book;
};

export { addNewBook, getAllBooks, getBookById };
