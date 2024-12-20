import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoutes"; 

import Home from "./pages/Home";
const BookListing = lazy(() => import("./pages/BookListing"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const AddBook = lazy(() => import("./pages/AddBook"));
const SignUp = lazy(() => import("./pages/signUp"));
const SignIn = lazy(() => import("./pages/signIn"));

const App = () => (
  <Router>
    <Header />
    <main className="min-h-screen p-4">
      <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
        <Routes>
          <Route 
            path="/sign-up" 
            element={<PrivateRoute element={<SignUp />} isProtected={false} />} 
          />
          <Route 
            path="/sign-in" 
            element={<PrivateRoute element={<SignIn />} isProtected={false} />} 
          />

          <Route path="/" element={<Home />} />
          <Route
            path="/books"
            element={<PrivateRoute element={<BookListing />} isProtected={true} />}
          />
          <Route
            path="/books/:id"
            element={<PrivateRoute element={<BookDetails />} isProtected={true} />}
          />
          <Route
            path="/books/add"
            element={<PrivateRoute element={<AddBook />} isProtected={true} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<UserProfile />} isProtected={true} />}
          />
        </Routes>
      </Suspense>
    </main>
    <Footer />
  </Router>
);

export default App;
