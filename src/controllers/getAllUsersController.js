import { getAllUsersService } from "../services/getAllUsersService.js";

export async function getAllUsersController(req, res) {
    try {
        const users = await getAllUsersService();
        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}