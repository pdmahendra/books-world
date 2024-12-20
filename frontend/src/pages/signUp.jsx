import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/query/loginQuery";
import { toast } from "react-hot-toast";
import handleImageUpload from "../api/query/uploadQuery";
import { useUser } from "../context/userContext";

const Signup = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      fName,
      lName,
      email,
      password,
      userType,
      imageUrl,
    };

    try {
      const response = await signUp({ payload });
      const { user, token } = response;
      localStorage.setItem("token", token);
      setUser(user);
      toast.success(`Welcome, ${user.fName}!`);
      navigate("/");
      setFName("");
      setLName("");
      setEmail("");
      setPassword("");
      setUserType("user");
      setImageUrl("");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center ">
      <div className="md:w-[25%] w-[80%] flex flex-col items-start gap-2">
        <div className="flex flex-col gap-1 ">
          <div className="font-semibold text-[2rem]">Signup</div>
          <div>Please enter your details to Sign Up</div>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <div>First Name*</div>
              <input
                type="text"
                name="fName"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                className="bg-[#EFEFEF] px-4 py-2 rounded-[5px] w-full"
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div>Last Name*</div>
              <input
                type="text"
                name="lName"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                className="bg-[#EFEFEF] px-4 py-2 rounded-[5px] w-full"
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div>Email*</div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#EFEFEF] px-4 py-2 rounded-[5px] w-full"
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div>Password*</div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#EFEFEF] px-4 py-2 rounded-[5px] w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-semibold">
                Are you a reader or publisher?
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="reader"
                  name="userType"
                  value="user"
                  checked={userType === "user"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="reader" className="mr-4">
                  Reader
                </label>

                <input
                  type="radio"
                  id="publisher"
                  name="userType"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="publisher">Publisher</label>
              </div>
            </div>

            <button
              type="submit"
              className={`px-4 py-2 text-white bg-[#ff6023] rounded ${
                imageUploading ? "cursor-not-allowed" : ""
              }`}
              disabled={imageUploading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
