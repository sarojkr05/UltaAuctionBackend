import jwt from 'jsonwebtoken';
import {UnAuthorisedError} from '../utils/unAuthorizedError.js'
import serverConfig from '../config/serverConfig.js';

export async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];
    console.log(token);
    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, serverConfig.JWT_SECRET);
        console.log(decoded, decoded.exp, Date.now() / 1000);
        
        if(!decoded) {
            throw new UnAuthorisedError();
        }
        // if reached here, then user is authenticated allow them to access the api

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }
        next();
    } catch (error) {
        console.log(error.name);
         if(error.name === "TokenExpiredError") {
             res.cookie("authToken", "", {
                 httpOnly: true,
                 secure: false,
                 maxAge: 7 * 24 * 60 * 60 * 1000
             });
             return res.status(200).json({
                 success: true,
                 message: "Log out successfull",
                 error: {},
                 data: {}
             });
         }
        return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Invalid Token provided"
        });
    }
}

/**
 * This function checks if the authenticated user is an admin or not ?
 * Becuase we will call isAdmin after isLoggedIn thats why we will receive user details
 */
export function isAdmin(req, res, next) {
    const loggedInUser = req.user;
    console.log(loggedInUser);
    if(loggedInUser.role === "ADMIN") {
        console.log("User is an admin");
        next();
    } else {
        return res.status(401).json({
            success: false,
            data:{},
            message: "You are not authorised for this action",
            error: {
                statusCode: 401,
                reason: "Unauthorised user for this action"
            }
        })
    }
}