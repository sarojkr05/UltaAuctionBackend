import Report from "../schema/reportSchema.js";

export async function createReport(reportDetails) {
    try {
        const report = new Report(reportDetails);
        await report.save();
        return report;
    } catch (error) {
        console.log("Error craeting report: (repo):", error);
        throw new Error("Error creating report");
    }
}

export async function getAllReports() {
    try {
        const reports = await Report.find().populate('userId', '-password -__v').sort({ createdAt: -1 });
        // Exclude sensitive information like password and __v
        console.log("Fetched reports: (repo):", reports);
        return reports;
    } catch (error) {
        console.log("Error fetching all reports: (repo):", error);
        throw new Error("Error fetching all reports");
    }
}