import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = { id: user._id, userType: user.userType };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
