import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to check if the user is authenticated
const userAuthMiddleware = async (req, res, next) => {
  try {
    // Get the token from the headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).send({
        message: "Authorization failed, please provide valid authorization",
        success: false,
      });
    }
    // Json web tokens are stored as Bearer <token> auth in the headers
    const token = req.headers.authorization.split(" ")[1];
    // If the token is not present in the headers, return an error
    if (!token) {
      return res.status(400).send({
        message: "Token not found, Authentication failed",
        success: false,
      });
    }
    // Verify the token
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    // If the token is not valid, return an error
    if (!decodedToken) {
      return res.status(400).send({
        message: "Token is not valid, Authentication failed",
        success: false,
      });
    }
    // If the token is valid, then find the user in the database
    const foundUser = await User.findById(decodedToken.userId);
    // If the user is not found, return an error
    if (!foundUser) {
      return res.status(400).send({
        message: "Authentication failed, User not found",
        success: false,
      });
    }
    // If the user is found, then add the user to the request object
    req.user = foundUser;
    // Call the next function in the execution list
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message:
        "Error from userAuthMiddleware while authenticating a user, Authentication failed",
      success: false,
      error: error,
    });
  }
};

export default userAuthMiddleware;
