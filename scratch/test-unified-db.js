import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../backend/models/User.js';
import History from '../backend/models/History.js';
import Enquiry from '../backend/models/Enquiry.js';
import Blog from '../backend/models/Blog.js';
import Contact from '../backend/models/Contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from root
dotenv.config({ path: path.join(__dirname, '../.env') });

async function runTest() {
    console.log("=== DB Restructuring Verification ===");
    console.log("Connecting to:", process.env.MONGO_URI ? "MONGO_URI (defined)" : "undefined");
    
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI not found in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("✅ Connected successfully!");

    // 1. Test User
    console.log("\n[Test 1] Verifying User model...");
    const testUser = new User({
        username: "testuser_" + Date.now(),
        email: "testuser_" + Date.now() + "@test.com",
        password: "hashedpassword123",
        firstName: "Test",
        lastName: "User",
        phone: String(Math.floor(1000000000 + Math.random() * 9000000000))
    });
    await testUser.save();
    console.log("✅ User model works. Created ID:", testUser._id);

    // 2. Test History
    console.log("\n[Test 2] Verifying History model...");
    const testLog = new History({
        userId: testUser._id,
        action: "TEST_RUN",
        details: { step: "Verification", success: true },
        ipAddress: "127.0.0.1",
        userAgent: "Integration Tester"
    });
    await testLog.save();
    console.log("✅ History model works. Created ID:", testLog._id);

    // 3. Test Enquiry
    console.log("\n[Test 3] Verifying Enquiry model...");
    const testEnquiry = new Enquiry({
        name: "Enquiry Tester",
        email: "enquiry@tester.com",
        phone: "1234567890",
        type: "admission",
        course: "Fashion Design",
        city: "Mumbai",
        state: "Maharashtra",
        centre: "Mumbai West"
    });
    await testEnquiry.save();
    console.log("✅ Enquiry model works. Created ID:", testEnquiry._id);

    // 4. Test Blog
    console.log("\n[Test 4] Verifying Blog model...");
    const testBlog = new Blog({
        title: "Test Blog Title",
        excerpt: "An excerpt of the test blog post.",
        category: "Fashion",
        author: "Admin",
        content: "Detailed markdown content of the test blog post.",
        readTime: "3 mins"
    });
    await testBlog.save();
    console.log("✅ Blog model works. Created ID:", testBlog._id);

    // 5. Test Contact
    console.log("\n[Test 5] Verifying Contact model...");
    const testContact = new Contact({
        name: "Contact Sender",
        email: "contact@sender.com",
        phone: "1234567890",
        subject: "General Support",
        message: "Hi, I have a quick question about fashion design courses."
    });
    await testContact.save();
    console.log("✅ Contact model works. Created ID:", testContact._id);

    // Cleanup
    console.log("\nCleaning up test records...");
    await User.findByIdAndDelete(testUser._id);
    await History.findByIdAndDelete(testLog._id);
    await Enquiry.findByIdAndDelete(testEnquiry._id);
    await Blog.findByIdAndDelete(testBlog._id);
    await Contact.findByIdAndDelete(testContact._id);
    console.log("✅ Cleanup successful!");

    await mongoose.connection.close();
    console.log("\n=== ALL TESTS PASSED! ===");
}

runTest().catch(err => {
    console.error("❌ Test Failed:", err);
    try {
        mongoose.connection.close();
    } catch (e) {}
});
