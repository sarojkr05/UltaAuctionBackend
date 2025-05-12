import { Auction } from '../schema/auctionSchema.js';
import { User } from '../schema/userSchema.js';

export async function getTotalUsers() {
    try {
        const totalUsers = await User.countDocuments();
        return totalUsers;
    } catch (error) {
        throw new Error('Error fetching total users');
    }
}

export async function getActiveAuctions() {
    try {
        const activeAuctions = await Auction.countDocuments({ status: 'active' });
        return activeAuctions;
    } catch (error) {
        throw new Error('Error fetching active auctions');
    }
}

export async function getCompletedAuctions() {
    try {
        const completedAuctions = await Auction.countDocuments({ status: 'completed' });
        return completedAuctions;
    } catch (error) {
        throw new Error('Error fetching completed auctions');
    }
}

export async function getTodayReports() {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const todayReports = await Auction.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        return todayReports;
    } catch (error) {
        throw new Error('Error fetching today reports');
    }
}