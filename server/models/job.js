import mongoose from "mongoose";
const { Schema, model } = mongoose;

const jobSchema = Schema({
    id: String,
    title: String,
    description: String,
    timeLogged: [{
        id: String,
        hours: Number,
        date: Date,
    }],

});

const Job = model('Job', jobSchema);


export default Job;