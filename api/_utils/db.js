import mongoose from 'mongoose';

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }
    
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is missing');
    }
    
    return mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
