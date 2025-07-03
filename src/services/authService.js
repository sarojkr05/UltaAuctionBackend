import { findUser } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import serverConfig from "../config/serverConfig.js";
import jwt from "jsonwebtoken";

export async function loginUser(authDetails) {
  const { email, mobileNumber, password } = authDetails;

  // Step 1: Check if user exists by email or mobile number
  let user;

  if (email) {
    user = await findUser({ email });
  } else if (mobileNumber) {
    user = await findUser({ mobileNumber });
  }

  if (!user) {
    throw {
      message: "No user found with the provided credentials",
      statusCode: 404,
    };
  }

  // 2. If the user is found we need to compare plainIncomingPassword with hashedPass
  const isPasswordValidated = await bcrypt.compare(password, user.password);

if (!isPasswordValidated) {
  throw { message: "Invalid password, please try again", statusCode: 401 };
}

  const userRole = user.role ? user.role : "USER";

  //   console.log("JWT_SECRET before signing:", serverConfig.JWT_SECRET);
  //   console.log("Type of JWT_SECRET:", typeof serverConfig.JWT_SECRET);
  //   console.log("Payload:", { email: user.email, id: user._id, role: userRole });

  // 3. If the password is validated, create a token ansd return it
  const token = jwt.sign(
    { email: user.email, id: user._id, role: userRole },
    serverConfig.JWT_SECRET,
    {
      expiresIn: serverConfig.JWT_EXPIRY,
    }
  );

  console.log("Generated Token:", token);

  return {
    token,
    userRole,
    userData: {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
    },
  };
}
