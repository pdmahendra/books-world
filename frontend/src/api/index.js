export const SERVER_BASE_URL = `https://book-review-hfsh.onrender.com`;

export const API = {
  users: {
    login: `${SERVER_BASE_URL}/api/v1/user/sign-in`,
    getUser: `${SERVER_BASE_URL}/api/v1/user/get-user`,
  },
  upload: {
    imgUpload: `${SERVER_BASE_URL}/api/v1/upload`,
  },
  book: {
    addBook: `${SERVER_BASE_URL}/api/v1/books/add`,
    getAllBooks: `${SERVER_BASE_URL}/api/v1/books/get-books`,
    getBookById: `${SERVER_BASE_URL}/api/v1/books/get-book`,
  },
  review: {
    submitReview: `${SERVER_BASE_URL}/api/v1/review/submit-review`,
    getReviewsByBookId: `${SERVER_BASE_URL}/api/v1/review/get-review`,
    getReviewsByUserId: `${SERVER_BASE_URL}/api/v1/review//get-review`,
  },
};
