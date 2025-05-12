import { getTotalUsers, getActiveAuctions, getCompletedAuctions, getTodayReports } from "../repositories/adminRepository.js";

export async function getAdminDashboardData() {
    try {
        const totalUsers = await getTotalUsers();
        const activeAuctions = await getActiveAuctions();
        const completedAuctions = await getCompletedAuctions();
        const todayReports = await getTodayReports();

        return {
            totalUsers,
            activeAuctions,
            completedAuctions,
            todayReports
        };
    } catch (error) {
        throw new Error('Error fetching admin dashboard data');
    }
}