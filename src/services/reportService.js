import { createReport, getAllReports } from "../repositories/reportRepository.js";

export async function createReportService(reportDetails) {
    try {
        const report = await createReport(reportDetails);
        return report;
    } catch (error) {
        throw new Error("Error creating report");
    }
}

export async function getAllReportsService() {
    try {
        const reports = await getAllReports();
        return reports;
    } catch (error) {
        throw new Error("Error fetching all reports");
    }
}