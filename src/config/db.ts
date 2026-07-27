import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/reminder-assistant');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('⚠️ Warning: Could not connect to MongoDB. Database features will be unavailable:', error);
    }
};
