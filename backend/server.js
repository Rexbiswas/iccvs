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

// Load environment variables from root or backend folder
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('🔍 MONGO_URI Debug:', process.env.MONGO_URI ? 'Defined (length: ' + process.env.MONGO_URI.length + ')' : 'UNDEFINED');

const app = express();
const PORT = process.env.PORT || 5001;

// Security Middleware
app.use(helmet());
app.set('trust proxy', 1); // Required for Vercel/proxies to handle HTTPS headers

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiter to all API routes
app.use('/api/', limiter);

// Optimized CORS for Production
const allowedOrigins = [
    'https://insd-project.vercel.app',
    'https://insd.edu.in',
    'http://localhost:5173',
    'http://localhost:5174'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());

// Diagnostic Ping
app.get('/api/ping', (req, res) => res.send('pong'));
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
    // Return existing connection if ready
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    const localURI = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/insd';
    const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL;

    const runSync = () => {
        const models = {
            admission: AdmissionLead,
            stepleads: StepLead,
            contacts: ContactLead,
            paris: ParisLead,
            partner: PartnerLead,
            users: User
        };
        syncBackups(models);
    };

    const cloudURI = process.env.MONGO_URI;
    console.log("🔍 [Debug] MONGO_URI from process.env:", cloudURI);

    if (cloudURI) {
        try {
            console.log('📡 Connecting to MongoDB Atlas...');
            const conn = await mongoose.connect(cloudURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000,
                family: 4
            });
            console.log(`\n=========================================`);
            console.log(`✅ [DB Connected] Host: ${conn.connection.host}`);
            console.log(`✅ [DB Connected] Name: ${conn.connection.name}`);
            console.log(`=========================================\n`);
            isConnected = true;
            if (!process.env.VERCEL) runSync();
            return conn;
        } catch (cloudErr) {
            console.error(`❌ MongoDB Connection Error: ${cloudErr.message}`);
        }
    }

    // Attempt Local Connection (Only in Dev)
    if (!isProd) {
        try {
            console.log(`🏠 Attempting Local Connection: ${localURI}...`);
            const conn = await mongoose.connect(localURI, localOptions);
            console.log('✅ Local MongoDB Connected');
            isConnected = true;
            runSync();
            return conn;
        } catch (localErr) {
            console.error(`🛑 No database found at ${localURI}.`);
            console.info('💡 Ensure MongoDB is running locally (run "mongod" in terminal).');
            console.info('💡 Entering Buffer Mode (Data will be saved to local JSON backups).');
            // We don't await the retry
            setTimeout(connectDB, 30000);
        }
    }
};

// 1. Global API Request Logger
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
        console.log(`\n[API Request] ${req.method} ${req.url}`);
        if (req.method === 'POST') {
            console.log(`[API Body]`, JSON.stringify(req.body, null, 2));
        }
    }
    next();
});

// 2. Database Connection Middleware
app.use(async (req, res, next) => {
    if (req.url.startsWith('/api')) {
        if (mongoose.connection.readyState !== 1) {
            console.log('🔄 Request received but DB not connected. Re-attempting...');
            connectDB().catch(err => console.error('Background DB Reconnect Failed:', err.message));
        }
    }
    next();
});

// --- API ROUTES REGISTRATION ---
const apiRouter = express.Router();

// --- DIRECT TEST ROUTES (Bypass Router) ---
app.get('/api/test-direct', (req, res) => {
    res.json({ 
        success: true, 
        message: "Direct App route is functional!",
        env: {
            node: process.version,
            hasMongo: !!process.env.MONGO_URI,
            hasEmail: !!process.env.GOOGLE_EMAIL,
            isVercel: !!process.env.VERCEL
        }
    });
});

// Diagnostic Endpoint
app.get('/api/diagnostic', (req, res) => {
    res.json({
        success: true,
        message: "API Gateway is active",
        dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Offline/Connecting',
        timestamp: new Date().toISOString()
    });
});

// --- MOUNTING & CORS PREFLIGHT ---
app.options('*', cors()); // Enable pre-flight for all routes

// Path Normalizer & Debugger
apiRouter.use((req, res, next) => {
    console.log(`📡 [Router Entry] ${req.method} ${req.path}`);
    next();
});

// Define sub-routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/leads', leadRoutes);
apiRouter.use('/step-leads', stepLeadRoutes);
apiRouter.use('/admission', admissionRoutes);
apiRouter.use('/paris', parisRoutes);
apiRouter.use('/partner', partnerRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/blogs', blogRoutes);

// Compatibility Aliases
apiRouter.use('/blog', blogRoutes);

// Health Check / Ping
apiRouter.get('/ping', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Main Application Mounting
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Global Error Handler for all requests
app.use((err, req, res, next) => {
    console.error('🔥 [Critical Server Error]:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Final API 404 handler
app.all('/api/*', (req, res) => {
    console.warn(`⚠️ [404] API Route not found: ${req.method} ${req.url}`);
    res.status(404).json({
        success: false,
        message: `API Route not found: ${req.method} ${req.url}.`,
        availableEndpoints: ['/api/auth/register', '/api/admission', '/api/step-leads', '/api/paris/lead', '/api/partner/leads', '/api/contact', '/api/blogs']
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
        
        // Initial connection attempt
        connectDB();
    });
}

export default app;
