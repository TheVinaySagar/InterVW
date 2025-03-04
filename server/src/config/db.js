import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = "mongodb+srv://vedant:1234@taskmanager.m1ymg.mongodb.net/InterVW?retryWrites=true&w=majority&appName=TaskManager"

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);

        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
