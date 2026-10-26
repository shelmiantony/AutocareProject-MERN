import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const protect = async (req, res, next) => {
  try {
    //reads the JWT from the cookie.
    let token = req.cookies.jwt;
    //Verifies the token.
    if (!token) {
      return res.status(401).json({
        message: "Not authorized,no token",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};
export default protect;
