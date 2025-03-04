import express from "express";
import Configuration from "./config/configuration.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(Configuration.Cors);
app.use(express.json());

// Connect to MongoDB
Configuration.connectDB();

// Route integration
Configuration.configRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
