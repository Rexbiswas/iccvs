import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function inspect() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;

    // Inspect 'people' collection
    try {
        const peopleDocs = await db.collection('people').find().toArray();
        console.log("\n--- COLLECTION: people (Count: " + peopleDocs.length + ") ---");
        peopleDocs.forEach(d => console.log(`ID: ${d._id}, Username: ${d.username}, Email: ${d.email}, isAdmin: ${d.isAdmin}`));
    } catch (e) {
        console.error(e);
    }

    // Inspect 'users' collection
    try {
        const usersDocs = await db.collection('users').find().toArray();
        console.log("\n--- COLLECTION: users (Count: " + usersDocs.length + ") ---");
        usersDocs.forEach(d => console.log(`ID: ${d._id}, Username: ${d.username}, Email: ${d.email}, isAdmin: ${d.isAdmin}`));
    } catch (e) {
        console.error(e);
    }

    await mongoose.connection.close();
}

inspect();
