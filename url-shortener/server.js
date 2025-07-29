const express = require("express");
const logger = require("./middleware/logger");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(logger); // Custom logging middleware

// Routes
app.use("/", urlRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
