const ExcelJS = require("exceljs");
const { spawn } = require("child_process");
const path = require("path");

// 🔥 TEMP STORAGE FOR DOWNLOAD FEATURE
let latestReport = null;

const runFetchUpdate = (req, res) => {

    const { input } = req.body;

    const usernames = input
        .split("\n")
        .map(u => u.trim())
        .filter(u => u !== "");

    const psScript = path.join(__dirname, "../scripts/Run-ForceUpdate.ps1");

    const args = [
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        psScript,
        "-Usernames",
        usernames.join(",")
    ];

    const ps = spawn("powershell.exe", args);

    let outputData = "";
    let errorData = "";

    ps.stdout.on("data", (data) => {
        outputData += data.toString();
    });

    ps.stderr.on("data", (data) => {
        errorData += data.toString();
    });

    ps.on("close", () => {

        let json = null;

        // ==============================
        // ✅ FIXED JSON PARSING (SAFE)
        // ==============================
        try {
            const jsonStart = outputData.indexOf("[");
            const jsonEnd = outputData.lastIndexOf("]");

            if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonString = outputData.substring(jsonStart, jsonEnd + 1);
                json = JSON.parse(jsonString);
            }

        } catch (err) {
            console.log("JSON parse error:", err.message);
            json = null;
        }

        // ==============================
        // STORE REPORT FOR DOWNLOAD
        // ==============================
        latestReport = json;

        // ==============================
        // CLEAN LOGS FOR FRONTEND
        // ==============================
        const logs = outputData
            .split("\n")
            .map(l => l.trim())
            .filter(l => l !== "");

        res.json({
            status: "success",
            logs: logs,
            report: json,
            error: errorData || null
        });
    });
};

// ==============================
// DOWNLOAD REPORT ENDPOINT
// ==============================
const downloadReport = (req, res) => {

    if (!latestReport || latestReport.length === 0) {
        return res.status(404).json({
            message: "No report available yet"
        });
    }

    try {

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Force Update Report");

        // Columns
        sheet.columns = [
            { header: "Username", key: "Username", width: 25 },
            { header: "Source", key: "Source", width: 20 },
            { header: "Response", key: "Response", width: 60 },
            { header: "Timestamp", key: "Timestamp", width: 25 }
        ];

        // Rows
        latestReport.forEach(item => {
            sheet.addRow({
                Username: item.Username,
                Source: item.Source,
                Response: item.Response,
                Timestamp: item.Timestamp
            });
        });

        sheet.getRow(1).font = { bold: true };

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=ForceUpdate_Report.xlsx"
        );

        workbook.xlsx.write(res).then(() => {
            res.end();
        });

    } catch (error) {
        res.status(500).json({
            message: "Error generating Excel file",
            error: error.message
        });
    }
};

module.exports = {
    runFetchUpdate,
    downloadReport
};