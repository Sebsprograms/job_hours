const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const jobSchema = Schema({
    title: String,
    hours: Number,
});

const Job = model('Job', jobSchema);


module.exports = Job;