import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function cleanup() {
    console.log("Connecting to MongoDB...");
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing from env");
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully!");

    const db = mongoose.connection.db;

    const collectionsToDrop = [
        'admissionleads',
        'admissions',
        'contactleads',
        'leads',
        'parisleads',
        'partnerleads',
        'people',
        'stepleads'
    ];

    console.log("\nStarting collection cleanup...");
    for (const colName of collectionsToDrop) {
        try {
            const collections = await db.listCollections({ name: colName }).toArray();
            if (collections.length > 0) {
                console.log(`Dropping collection: ${colName}...`);
                await db.dropCollection(colName);
                console.log(`✅ Dropped: ${colName}`);
            } else {
                console.log(`ℹ️ Collection does not exist (skipping): ${colName}`);
            }
        } catch (err) {
            console.error(`❌ Failed to drop ${colName}:`, err.message);
        }
    }

    // List remaining collections to verify
    console.log("\nRemaining Collections:");
    try {
        const remaining = await db.listCollections().toArray();
        remaining.forEach(c => console.log(`- ${c.name}`));
    } catch (err) {
        console.error("Failed to list collections:", err.message);
    }

    await mongoose.connection.close();
    console.log("\n=== CLEANUP COMPLETE ===");
}

cleanup().catch(err => {
    console.error("Cleanup failed:", err);
    try {
        mongoose.connection.close();
    } catch (e) {}
});
