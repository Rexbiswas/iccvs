import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export const getGoogleTransporter = async () => {
    // Priority: App password (no expiration)
    if (process.env.GOOGLE_APP_PASSWORD) {
        return nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GOOGLE_EMAIL || "rexbiswas1@gmail.com",
                pass: process.env.GOOGLE_APP_PASSWORD
            }
        });
    }

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
        console.warn("⚠️ Missing Google API setup credentials. Email functionality will be limited.");
        return null; 
    }
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "https://developers.google.com/oauthplayground");
    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    const accessTokenResponse = await oauth2Client.getAccessToken();

    if (!accessTokenResponse?.token) throw new Error("Could not retrieve access token");

    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.GOOGLE_EMAIL || "rexbiswas1@gmail.com",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken: accessTokenResponse.token
        }
    });
};
