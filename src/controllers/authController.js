import { loginUser } from "../services/authService.js";

export async function logout(req, res) {

    console.log("Cookie from controller frontend", req.cookies);

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
export async function login(req, res) {
    
    try {
        const loginPayload = req.body;

        console.log("While login", req.cookies);

        console.log("console after req.cookies");

        const response = await loginUser(loginPayload);

        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                userRole: response.userRole,
                userData: response.userData
            },
            error: {}
        })
    } catch(error) {
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            error: error
        })
    }
}