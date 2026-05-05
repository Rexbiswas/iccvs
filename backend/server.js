import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import os from 'os';
import dns from 'dns';
import authRoutes from './routes/auth.js';
import leadRoutes from './routes/leadauth.js';
import stepLeadRoutes from './routes/stepleads.js';
import admissionRoutes from './routes/admission.js';
import parisRoutes from './routes/paris.js';
import partnerRoutes from './routes/partner.js';
import contactRoutes from './routes/contact.js';
import blogRoutes from './routes/blogs.js';

// Models
import Lead from './models/Lead.js';
import AdmissionLead from './models/AdmissionLead.js';
import StepLead from './models/StepLead.js';
import ContactLead from './models/ContactLead.js';
import ParisLead from './models/ParisLead.js';
import PartnerLead from './models/PartnerLead.js';
import Blog from './models/Blog.js';
import User from './models/User.js';

// Utils
import { syncBackups } from './utils/offlineLogger.js';

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
    max: 500, // Increased for mobile networks/shared IPs
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 15 minutes."
        });
    }
});
app.use('/api/', apiLimiter);

// Protect against HTTP Parameter Pollution
app.use(hpp());

// Core Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

// Debug Middleware for Vercel
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
        console.log(`🔍 [API Request] ${req.method} ${req.url}`);
    }
    next();
});

// Graceful Error Handling for Development
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err.message);
    // On Vercel, we shouldn't exit as it kills the function instance
    if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) process.exit(1);
});



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
        serverSelectionTimeoutMS: 15000, // Increased for serverless cold starts
        socketTimeoutMS: 45000,
    };

    const runSync = () => {
        const models = {
            'leads': Lead,
            'admissions': AdmissionLead,
            'step-leads': StepLead,
            'contacts': ContactLead,
            'paris': ParisLead,
            'partner': PartnerLead,
            'blogs': Blog,
            'users': User
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
    } else {
        console.warn('⚠️ Production database connection skipped/failed. Ensure MONGO_URI is set.');
    }
};

connectDB();


// API Routes Sub-router
const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => {
    res.json({ 
        status: 'active', 
        message: 'INSD Core Backend is running', 
        dbReady: mongoose.connection.readyState,
        timestamp: new Date().toISOString()
    });
});

apiRouter.use('/auth', authRoutes);
apiRouter.use('/leads', leadRoutes);
apiRouter.use('/step-leads', stepLeadRoutes);
apiRouter.use('/admission', admissionRoutes);
apiRouter.use('/paris', parisRoutes);
apiRouter.use('/partner', partnerRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/blogs', blogRoutes);

// Mount the router at both /api and / to be safe on Vercel
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Catch-all for missing API routes
app.all('/api/*', (req, res) => {
    console.warn(`⚠️ [404] API Route not found: ${req.method} ${req.url}`);
    res.status(404).json({
        success: false,
        message: `API endpoint ${req.method} ${req.url} not found on this server.`
    });
});



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
