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
import historyRoutes from './routes/history.js';
import enquiryRoutes from './routes/enquiry.js';
import contactRoutes from './routes/contact.js';
import blogRoutes from './routes/blogs.js';
import { sanitizeRequest } from './middleware/sanitize.js';

// Models
import User from './models/User.js';
import History from './models/History.js';
import Enquiry from './models/Enquiry.js';
import Blog from './models/Blog.js';
import Contact from './models/Contact.js';



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
    'https://subdomain.iccvs.edu.in',
    'https://iccvs.edu.in',
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
app.use(sanitizeRequest);

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

    const localURI = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/iccvs';
    const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL;



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
            return conn;
        } catch (localErr) {
            console.error(`🛑 No database found at ${localURI}.`);
            console.info('💡 Ensure MongoDB is running locally (run "mongod" in terminal).');
            console.info('💡 Retrying connection in 30 seconds...');
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
apiRouter.use('/history', historyRoutes);
apiRouter.use('/enquiry', enquiryRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/blogs', blogRoutes);
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
app.use('/api/users', authRoutes);
app.get('/api', (req, res) => res.send('Working now!'));
app.use('/api', express.static('public'));
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
        availableEndpoints: ['/api/auth/register', '/api/admission', '/api/step-leads', '/api/contact', '/api/blogs']
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

// =====================================================================
// SERVER INITIALIZATION (Compatible with Vercel, cPanel, and Local)
// =====================================================================

// Always try to connect to the DB immediately when the file loads.
// This ensures persistent environments (cPanel/Local) get connected right away.
connectDB();

// Vercel handles the server listening internally. We ONLY run app.listen 
// if we are NOT on Vercel. cPanel and Local environments require app.listen.
if (!process.env.VERCEL) {
    const port = process.env.PORT || 5001;
    const localIp = getLocalIp();
    
    app.listen(port, '0.0.0.0', () => {
        console.log(`\n🚀 ICCVS Backend is live on port ${port}!`);
        if (process.env.NODE_ENV !== 'production') {
            console.log(`🏠 Local:   http://localhost:${port}`);
            console.log(`📱 Mobile:  http://${localIp}:${port}\n`);
        } else {
            console.log(`🌍 Environment: cPanel / Production`);
        }
    });
}

export default app;
