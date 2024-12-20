import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signIn = async (req, res) => {
  const { fName, lName, email, password, userType, imageUrl } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: existingUser._id, userType: existingUser.userType },
        process.env.JWT_SECRET
        // { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: existingUser._id,
          fName: existingUser.fName,
          lName: existingUser.lName,
          email: existingUser.email,
          userType: existingUser.userType,
          imageUrl: existingUser.imageUrl,
        },
        token,
      });
    }

    if (!fName || !lName) {
      return res.status(400).json({
        message: "First name and last Name are required for registration",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fName,
      lName,
      email,
      password: hashedPassword,
      userType,
      imageUrl,
    });

    const token = jwt.sign(
      { id: newUser._id, userType: newUser.userType },
      process.env.JWT_SECRET
      //   { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        fName: newUser.fName,
        lName: newUser.lName,
        email: newUser.email,
        userType: newUser.userType,
        imageUrl: newUser.imageUrl,
      },
      token,
    });
  } catch (error) {
    console.error("Error in login/signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { signIn, getUserById };
