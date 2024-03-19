// Imports
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

import Job from './models/job.js';
import { isValidDate, sanitizeDate } from './utils/helpers.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Database
mongoose.connect(process.env.ATLAS_URI);




// Routes
// Get all jobs
app.get('/api/v1/jobs', async (req, res) => {
    const jobs = await Job.find();
    if (!jobs) {
        return res.status(404).json({ message: 'No jobs found' });
    }
    res.status(200).json(jobs);
});

// Get a Job by id
app.get('/api/v1/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const job = await Job.find({ id: id });

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);

});

// Create a new job
app.post('/api/v1/jobs', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const timeLogged = req.body.timeLogged;

    if (title && description) {
        const newJob = new Job({
            id: nanoid(10),
            title: title,
            description: description,
            timeLogged: timeLogged ? timeLogged : [],
        });
        await newJob.save();
        res.status(201).json({ message: 'Job created', job: newJob });
    } else {
        res.sendStatus(400);
    }
});

// Update a job by id
app.patch('/api/v1/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const timeLogged = req.body.timeLogged;

    const job = await Job.findOne({ id: id });
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    if (title) {
        job.title = title;
    }

    if (description) {
        job.description = description;
    }

    if (timeLogged) {
        job.timeLogged = timeLogged;
    }

    await job.save();
    res.status(200).json({ message: 'Job updated', job: job });
});

// Delete a job by id
app.delete('/api/v1/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const job = await Job.findOne({ id: id });
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }
    await Job.findOneAndDelete({ id: id });
    res.status(200).json({ message: 'Job deleted' });
});

// Add hours to job on a date
app.post('/api/v1/jobs/:id/hours', async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;
    const hours = req.body.hours;

    if (!isValidDate(date)) {
        return res.status(400).json({ message: 'Invalid date' });
    }

    const job = await Job.findOne({ id: id });
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }
    const newDate = new Date(date);
    const comparsion = sanitizeDate(newDate);
    if (job.timeLogged.some(log => {
        const logdate = new Date(log.date);
        const logcomparsion = sanitizeDate(logdate);
        return logcomparsion === comparsion;

    })) {
        return res.status(400).json({ message: 'Hours already logged for this date' });
    }

    job.timeLogged.push({ id: nanoid(10), date: date, hours: hours });
    await job.save();
    res.status(201).json({ message: 'Hours added', job: job });
});

// Get hours by date from job
app.get('/api/v1/jobs/:id/hours/', async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;

    if (!isValidDate(date)) {
        return res.status(400).json({ message: 'Invalid date' });
    }

    const job = await Job.findOne({ id: id });
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    const hours = job.timeLogged.find(log => {
        const logDate = new Date(log.date);
        return sanitizeDate(logDate) === sanitizeDate(new Date(date));
    });

    if (!hours) {
        return res.status(404).json({ message: 'Hours not found' });
    }

    res.status(200).json(hours);
});

// Change hours on date
app.patch('/api/v1/jobs/:id/hours/', async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;
    const hours = req.body.hours;

    if (!isValidDate(date)) {
        return res.status(400).json({ message: 'Invalid date' });
    }

    const job = await Job.findOne({ id: id });
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    const log = job.timeLogged.find(log => {
        const logDate = new Date(log.date);
        return sanitizeDate(logDate) === sanitizeDate(new Date(date));
    });

    if (!log) {
        return res.status(404).json({ message: 'Hours not found' });
    }

    log.hours = hours;
    await job.save();
    res.status(200).json({ message: 'Hours updated', job: job });
});

// Delete hours from job on a date
app.delete('/api/v1/jobs/:id/hours/', async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;

    if (!isValidDate(date)) {
        return res.status(400).json({ message: 'Invalid date' });
    }

    const job = await Job.findOne({ id: id });
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    const log = job.timeLogged.find(log => {
        const logDate = new Date(log.date);
        return sanitizeDate(logDate) === sanitizeDate(new Date(date));
    });

    if (!log) {
        return res.status(404).json({ message: 'Hours not found' });
    }

    job.timeLogged = job.timeLogged.filter(log => {
        const logDate = new Date(log.date);
        return sanitizeDate(logDate) !== sanitizeDate(new Date(date));
    });

    await job.save();
    res.status(200).json({ message: 'Hours deleted', job: job });
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App listening on ${port}`);
});