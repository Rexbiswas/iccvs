import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import authRoutes from './routes/auth.js';
import leadRoutes from './routes/leadauth.js';
import stepLeadRoutes from './routes/stepleads.js';
import admissionRoutes from './routes/admission.js';
import parisRoutes from './routes/paris.js';
import partnerRoutes from './routes/partner.js';
import contactRoutes from './routes/contact.js';
import blogRoutes from './routes/blogs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// --- SOFTWARE FIREWALL (Security Middleware) ---
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://va.vercel-scripts.com"],
            imgSrc: ["'self'", "https://insd.edu.in", "data:"],
            connectSrc: ["'self'", "https://*.vercel-scripts.com", "https://*.vercel.sh", "https://www.googletagmanager.com"],
            objectSrc: ["'none'"],
        }
    }
}));

// Rate Limiter: Prevent DDOS and Brute Force
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { message: "Too many requests from this IP, please try again after 15 minutes." }
});
app.use('/api/', apiLimiter);

// Protect against HTTP Parameter Pollution
app.use(hpp());

// Core Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

// Graceful Error Handling for Development
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err.message);
    if (process.env.NODE_ENV === 'production') process.exit(1);
});

// Import Models for Sync
import Lead from './models/Lead.js';
import AdmissionLead from './models/AdmissionLead.js';
import StepLead from './models/StepLead.js';
import { syncBackups } from './utils/offlineLogger.js';
import dns from 'dns';

// Check if we have an active internet connection
const checkInternet = () => {
    return new Promise((resolve) => {
        dns.lookup('google.com', (err) => {
            resolve(!(err && err.code === 'ENOTFOUND'));
        });
    });
};

let isConnected = false;

// Database Connection Logic with Persistent Retries and Auto-Sync
const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    const cloudURI = process.env.MONGO_URI;
    const localURI = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/insd';
    
    // Skip internet check in production (Vercel) to save time
    const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL;
    const hasInternet = isProd ? true : await checkInternet();

    const options = {
        serverSelectionTimeoutMS: 10000, // Higher timeout for serverless cold starts
        socketTimeoutMS: 45000,
    };

    const runSync = () => {
        const models = {
            'leads': Lead,
            'admissions': AdmissionLead,
            'step-leads': StepLead
        };
        syncBackups(models);
    };

    if (hasInternet && cloudURI) {
        try {
            console.log('📡 Connecting to Cloud Database...');
            await mongoose.connect(cloudURI, options);
            console.log('✅ MongoDB Cloud Connected');
            isConnected = true;
            runSync();
            return;
        } catch (cloudErr) {
            console.warn('⚠️ Cloud Connection failed. Trying Local...');
        }
    }

    // Attempt Local Connection (Only in Dev)
    if (!isProd) {
        try {
            await mongoose.connect(localURI, options);
            console.log('✅ Local MongoDB Connected');
            isConnected = true;
            runSync();
        } catch (localErr) {
            console.error('🛑 No database found. Entering Buffer Mode.');
            setTimeout(connectDB, 30000);
        }
    }
};

connectDB();


// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'active', message: 'INSD Core Backend is running', dbReady: mongoose.connection.readyState });
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/step-leads', stepLeadRoutes);
app.use('/api/admission', admissionRoutes);
app.use('/api/paris', parisRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);

import os from 'os';

const getLocalIp = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '0.0.0.0';
};

// Start Server locally
if (process.env.NODE_ENV !== 'production') {
    const localIp = getLocalIp();
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`\n🚀 INSD Backend is live!`);
        console.log(`🏠 Local:   http://localhost:${PORT}`);
        console.log(`📱 Mobile:  http://${localIp}:${PORT}\n`);
    });
}

export default app;
