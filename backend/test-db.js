import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

const testConnection = async () => {
    console.log('Testing MONGO_URI:', process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ Connection Successful!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection Failed:', err.message);
        process.exit(1);
    }
};

testConnection();
