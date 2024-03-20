import { nanoid } from "nanoid";
import Job from '../models/job.js';

export const getAllJobs = async (req, res) => {
    const jobs = await Job.find();
    if (!jobs) {
        return res.status(404).json({ message: 'No jobs found' });
    }
    res.status(200).json(jobs);
}

export const getJob = async (req, res) => {
    const id = req.params.id;
    const job = await Job.find({ id: id });

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);

}

export const createJob = async (req, res) => {
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
}

export const updateJob = async (req, res) => {
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
}

export const deleteJob = async (req, res) => {
    const id = req.params.id;
    const job = await Job.findOne({ id: id });
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }
    await Job.findOneAndDelete({ id: id });
    res.status(200).json({ message: 'Job deleted' });
}

