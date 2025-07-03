import { COOKIE_OPTIONS } from "../config/cookieConfig.js";
import { loginUser } from "../services/authService.js";

export async function logout(req, res) {

    res.cookie("authToken", "", { ...COOKIE_OPTIONS, maxAge: 0 });
    return res.status(200).json({
        success: true,
        message: "Log out successfull",
        error: {},
        data: {}
    });
}
export async function login(req, res) {
  try {
    const loginPayload = req.body;

    const response = await loginUser(loginPayload);

    res.cookie("authToken", response.token, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: {
        userRole: response.userRole,
        userData: response.userData,
      },
      user: {
        id: response.userData._id,
        userEmail: response.userData.email,
        userRole: response.userRole,
      },
      error: {},
    });
  } catch (error) {
    // Fallback in case thrown error is not a proper object
    const statusCode = error?.statusCode || 500;
    const message = error?.message || "Internal Server Error";

    console.error("Login error:", error);

    return res.status(statusCode).json({
      success: false,
      data: {},
      message,
      error: error || {},
    });
  }
}
