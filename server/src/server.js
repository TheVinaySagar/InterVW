import express from 'express';
import cors from 'cors';
import Configuration from './config/configuration.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
// app.use(Configuration.Cors);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
Configuration.connectDB();

// Route integration
Configuration.configRoutes(app);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
