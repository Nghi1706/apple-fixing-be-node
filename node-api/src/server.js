require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import routes
const router = require("./routes/router");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", router);

// Global error handling middleware
// app.use(require("./middlewares/errorMiddleware"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
