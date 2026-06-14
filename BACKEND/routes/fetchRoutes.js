const express = require("express");
const router = express.Router();

const { runFetchUpdate, downloadReport } = require("../controllers/fetchUpdateController");

router.post("/run-fetch-update", runFetchUpdate);
router.get("/download-report", downloadReport);

module.exports = router;