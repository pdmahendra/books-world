import React, { useState, useRef } from "react";
import handleImageUpload from "../api/query/uploadQuery";
import { addNewBook } from "../api/query/bookQuery";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AddBook = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setImageUploading(true);
      try {
        const response = await handleImageUpload(file);
        setImageUrl(response.contentUrl);
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
      } finally {
        setImageUploading(false);
      }
    }
  };

  const mutation = useMutation({
    mutationFn: addNewBook,
    onSuccess: () => {
      toast.success("Book added successfully!");
      setTitle("");
      setAuthor("");
      setDescription("");
      setGenre("");
      setImageUrl("");
      setLanguage("");
      fileInputRef.current.value = "";
      navigate("/books");
    },
    onError: () => {
      toast.error("Failed to add the book.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      author,
      genre,
      description,
      language,
      coverImageUrl: imageUrl,
    };

    if (!imageUrl) {
      toast.error("Please upload a cover image first.");
      return;
    }

    mutation.mutate({ payload });
  };
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h1 className="text-2xl font-bold mb-6">Add a New Book</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Book Title *</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Author(s) *</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Genre(s) *</label>
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Cover Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Language</label>
          <input
            type="text"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-[#ff6023] text-white p-3 rounded hover:shadow-xl  ${
            imageUploading ? "cursor-not-allowed" : ""
          }`}
          disabled={imageUploading}
        >
          {mutation.isLoading ? "Adding Book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
