const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const jobSchema = Schema({
    title: String,
    hours: Number,
    date: Date,
});

const Job = model('Job', jobSchema);


module.exports = Job;