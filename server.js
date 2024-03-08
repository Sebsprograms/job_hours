require('dotenv').config();


const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_URI);

const Job = require('./models/job');

app.get('/', (req, res) => {
    // TODO: Send all jobs
    res.send('Get');
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

app.delete('/', (req, res) => {
    // TODO: Delete job
    res.send('Delete');
});



app.listen(port, () => {
    console.log(`App listening on ${port}`);
});