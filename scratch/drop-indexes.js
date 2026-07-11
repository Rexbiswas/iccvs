import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function dropIndexes() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected!");

    const db = mongoose.connection.db;

    // Drop index from 'histories'
    try {
        const indexes = await db.collection('histories').indexes();
        console.log("Existing indexes on 'histories':", indexes.map(i => i.name));
        
        if (indexes.some(i => i.name === 'id_1')) {
            console.log("Dropping 'id_1' index from histories collection...");
            await db.collection('histories').dropIndex('id_1');
            console.log("✅ Successfully dropped 'id_1' index!");
        }
        if (indexes.some(i => i.name === 'email_1')) {
            console.log("Dropping 'email_1' index from histories collection...");
            await db.collection('histories').dropIndex('email_1');
            console.log("✅ Successfully dropped 'email_1' index!");
        }
        if (indexes.some(i => i.name === 'phone_1')) {
            console.log("Dropping 'phone_1' index from histories collection...");
            await db.collection('histories').dropIndex('phone_1');
            console.log("✅ Successfully dropped 'phone_1' index!");
        }
    } catch (e) {
        console.error("Error with histories indexes:", e.message);
    }

    // Check 'users' indexes too
    try {
        const indexes = await db.collection('users').indexes();
        console.log("Existing indexes on 'users':", indexes.map(i => i.name));
        
        // If there's an outdated unique index on 'phone' or 'email' that needs removing, we can note it
    } catch (e) {
        console.error("Error with users indexes:", e.message);
    }

    await mongoose.connection.close();
}

dropIndexes().catch(err => console.error("Index cleanup failed:", err));
