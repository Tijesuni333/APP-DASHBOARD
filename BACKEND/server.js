const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const fetchRoutes = require("./routes/fetchRoutes");
app.use("/", fetchRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});