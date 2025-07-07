import { createUser, findUser } from "../repositories/userRepository.js";
import { AppError } from "../utils/appError.js";

export async function registerUser(userDetails) {
  // It will create a brand new user in the db

  // 1. We need to check if the user with this email and mobile number already exists or not
  const user = await findUser({
    $or: [
      { email: userDetails.email },
      { mobileNumber: userDetails.mobileNumber },
    ],
  });

  if (user) {
    console.log("User already exists:", user);
    // we found a user
    throw new AppError("User with the given email or mobile number already exists", 400)
  }

  // 2. If not then create the user in the database
  const newUser = await createUser({
    email: userDetails.email,
    password: userDetails.password,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    mobileNumber: userDetails.mobileNumber,
  });

  if (!newUser) {
  throw new AppError('Something went wrong, cannot create user', 500);
}

  // 3. retuern the details of created user
  return newUser;
}
