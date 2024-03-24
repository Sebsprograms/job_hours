// Imports
import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import jobRouter from './routes/jobRouter.js';
import hoursRouter from './routes/hoursRouter.js';
import { errorHandler } from './middleware/errorHandler.js';


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/jobs', hoursRouter);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);


const port = process.env.PORT || 8000;
try {
    // Database
    await mongoose.connect(process.env.ATLAS_URI);
    app.listen(port, () => {
        console.log(`App listening on ${port}`);
    });
} catch (error) {
    console.error(error);
    process.exit(1);
}
