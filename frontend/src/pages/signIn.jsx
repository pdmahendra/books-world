import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/query/loginQuery";
import { toast } from "react-hot-toast";
import { useUser } from "../context/userContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      email,
      password,
    };

    try {
      const response = await signUp({ payload });
      const { user, token } = response;
      localStorage.setItem("token", token);
      setUser(user);
      toast.success(`Welcome back, ${user.fName}!`);
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("SignIn failed:", error);
      toast.error(
        "SignIn failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="md:w-[25%] w-[80%] flex flex-col items-start gap-2">
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-[2rem]">Sign In</div>
          <div>Please enter your credentials to sign in</div>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-full">
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
            <button
              type="submit"
              className={`px-4 py-2 text-white bg-[#ff6023] rounded ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
