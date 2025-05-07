import { findUser } from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import serverConfig from "../config/serverConfig.js";
import jwt from 'jsonwebtoken';

export async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // 1. Check if there is a registered user with the given email
    const user = await findUser({ email });

    if(!user) {
        throw {message: "No user found with the given email", statusCode: 404};
    }

    // 2. If the user is found we need to compare plainIncomingPassword with hashedPass
    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);

    if(!isPasswordValidated) {
        throw {message: "Invalid password, please try again", statusCode: 401};
    }

    const userRole = user.role ? user.role : "USER";

    console.log("JWT_SECRET before signing:", serverConfig.JWT_SECRET);
console.log("Type of JWT_SECRET:", typeof serverConfig.JWT_SECRET);
console.log("Payload:", { email: user.email, id: user._id, role: userRole });

    // 3. If the password is validated, create a token ansd return it
    const token = jwt.sign({ email: user.email, id: user._id, role: userRole }, serverConfig.JWT_SECRET, {
        expiresIn: serverConfig.JWT_EXPIRY
    });

    
console.log("Generated Token:", token);

    return {token, userRole, userData: {
        email: user.email,
        firstName: user.firstName,
    }};
}
