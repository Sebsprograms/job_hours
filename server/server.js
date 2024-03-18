// Imports
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

import Job from './models/job.js';
import { isValidDate } from './utils/helpers.js';

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
    const job = await Job.findById(id);

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);

});

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

app.delete('/api/v1/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const job = await Job.findOne({ id: id });
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }
    await Job.findOneAndDelete({ id: id });
    res.status(200).json({ message: 'Job deleted' });
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App listening on ${port}`);
});