import axios from "../../middleware/axiosMiddleware.js";
import { API } from "../index";

const addReview = async ({ payload }) => {
  const response = await axios.post(`${API.review.submitReview}`, payload);
  return response.data;
};

const getReviewsByBookId = async (id) => {
  const response = await axios.get(`${API.review.getReviewsByBookId}/${id}`);
  return response.data.reviews;
};

const getReviewsByUserId = async () => {
  const response = await axios.get(`${API.review.getReviewsByUserId}`);
  return response.data.reviews;
};

export { addReview, getReviewsByBookId, getReviewsByUserId };
