import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './_utils/db.js';
import contactRoutes from '../backend/routes/contact.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use('/api/contact', contactRoutes);

export default app;
