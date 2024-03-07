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
    // TODO: Add job to the list of jobs
    const testJob = new Job({
        title: 'Test Job',
        hours: 11.5,
    });
    await testJob.save();
    res.send('Post');
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