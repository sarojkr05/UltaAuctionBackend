import { createReportService, getAllReportsService } from "../services/reportService.js";

export async function createReportController(req, res) {
    try {
        const reportDetails = req.body;
        console.log("Incoming report details:", reportDetails);
        const report = await createReportService(reportDetails);
        return res.status(201).json({
            success: true,
            message: "Report created successfully",
            data: report,
        });
    } catch (error) {
        console.log("Error in creating report:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function getAllReportsController(req, res) {
    try {
        const reports = await getAllReportsService();
        return res.status(200).json({
            success: true,
            message: "All reports fetched successfully",
            data: reports,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}