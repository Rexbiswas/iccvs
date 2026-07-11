import dotenv from 'dotenv';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

dotenv.config();

async function testOAuth() {
    console.log("--- Google OAuth2 Test ---");
    console.log("GOOGLE_EMAIL:", process.env.GOOGLE_EMAIL);
    console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
    console.log("GOOGLE_CLIENT_SECRET (len):", process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET.length : 0);
    console.log("GOOGLE_REFRESH_TOKEN (len):", process.env.GOOGLE_REFRESH_TOKEN ? process.env.GOOGLE_REFRESH_TOKEN.length : 0);

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
        console.log("❌ Missing Google OAuth2 credentials in .env");
        return;
    }

    try {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );
        
        oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
        
        console.log("Attempting to get access token...");
        const response = await oauth2Client.getAccessToken();
        console.log("Access Token response token retrieved:", !!response?.token);
        
        if (response?.token) {
            console.log("✅ OAuth2 token resolution succeeded!");
            
            console.log("Now testing SMTP transporter connection using OAuth2...");
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.GOOGLE_EMAIL || "rexbiswas1@gmail.com",
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                    accessToken: response.token
                }
            });
            
            await transporter.verify();
            console.log("✅ SMTP verify succeeded with OAuth2!");
        } else {
            console.log("❌ Failed to get access token. No token returned.");
        }
    } catch (error) {
        console.error("❌ OAuth2 Test Failed:");
        console.error(error);
    }
}

testOAuth();
