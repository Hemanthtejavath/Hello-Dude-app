import jwt from "jsonwebtoken";
import User from "../models/User.js";

// middleware funtion before accesing the onbording  cheking if user is valid or not 
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // if user or request dont have cookie
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - no token provided",
      });
    }
    // if user have a cookie
    // first decode the jwt token and verify the token with databse token
    const decoded = await jwt.verify(token, process.env.JWT_S_KEY);

    //if docoded value is not correct
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized - Invalid Token",
      });
    }
    // if token is valid then featch the user from the database with id - it ceated it own when user register
    const user = await User.findById(decoded.userId).select("-password");

    // if user is not exsist
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
      });
    }

    // if exist send back to the user details to user
    req.user = user;

    next(); // after this peformaing moving to  the next step
  } catch (error) {
    // Invalid/expired JWT should not be treated as 500.
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Unauthorized - Invalid or expired token",
      });
    }
    console.log("Error in protectRoute:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
