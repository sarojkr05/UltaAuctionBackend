import { getAdminDashboardData } from "../services/adminService.js";

export async function getAdminDashboardController(req, res) {
    try {
        const dashboardData = await getAdminDashboardData();

        return res.status(200).json({
            success: true,
            message: 'Admin dashboard data fetched successfully',
            data: dashboardData,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching admin dashboard data',
            error: error.message
        });
    }
}