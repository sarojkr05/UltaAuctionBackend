import { registerUser } from "../services/userService.js";
import { AppError } from "../utils/appError.js";
import jwt from "jsonwebtoken";
import serverConfig from "../config/serverConfig.js";
import { COOKIE_OPTIONS } from "../config/cookieConfig.js";

export async function createUser(req, res) {
  try {
    const user = await registerUser(req.body);

    const userRole = user.role || "USER";

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        role: userRole
      },
      serverConfig.JWT_SECRET,
      {
        expiresIn: serverConfig.JWT_EXPIRY
      }
    );

    res.cookie("authToken", token, COOKIE_OPTIONS);

    return res.status(201).json({
      message: "User registered & logged in",
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName
        },
        userRole
      },
      error: {}
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: {},
      error
    });
  }
}
