require('dotenv').config();


const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_URI);

const Job = require('./models/job');

app.get('/', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

app.post('/', async (req, res) => {
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

app.put('/', (req, res) => {
    // TODO: Update job
    res.send('Put');
});

app.delete('/', async (req, res) => {
    let id = req.query.id.toString().trim();
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