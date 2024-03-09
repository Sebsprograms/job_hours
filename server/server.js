// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database
const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_URI);
const Job = require('./models/job');


// Routes
app.get('/jobs', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

app.post('/jobs', async (req, res) => {
    const title = req.query.title;
    const hours = req.query.hours;
    if (title && hours) {
        const testJob = new Job({
            title: title,
            hours: hours,
        });
        await testJob.save();
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

app.put('/jobs', async (req, res) => {
    const id = req.query.id;
    const title = req.query.title;
    const hours = +req.query.hours;
    const update = {};

    if (id) {
        const jobs = await Job.find();
        if (jobs.map(job => job._id.toHexString()).includes(id)) {
            if (title && (typeof title === 'string' || title instanceof String)) {
                update.title = title;
            }
            if (hours && (typeof hours === 'number' || hours instanceof Number)) {
                update.hours = hours;
            }
            await Job.findByIdAndUpdate(id, update);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
});

app.delete('/jobs', async (req, res) => {
    const id = req.query.id.toString().trim();
    if (id) {
        const jobs = await Job.find();
        if (jobs.map(job => job._id.toHexString()).includes(id)) {
            await Job.findByIdAndDelete(id);
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }
});



app.listen(port, () => {
    console.log(`App listening on ${port}`);
});