import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.js';
import purchaseRoutes from './routes/purchases.js';
import transferRoutes from './routes/transfers.js';
import assignmentRoutes from './routes/assignments.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));

connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
