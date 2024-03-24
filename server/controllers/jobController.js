import { nanoid } from "nanoid";
import Job from '../models/job.js';
import { NotFoundError, BadRequestError } from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";


export const getAllJobs = async (req, res) => {
    const jobs = await Job.find();
    if (!jobs) throw new NotFoundError('Jobs not found');
    res.status(StatusCodes.OK).json(jobs);
}

export const getJob = async (req, res) => {
    const id = req.params.id;
    const job = await Job.find({ id: id });

    if (!job) throw new NotFoundError('Job not found');

    res.status(StatusCodes.OK).json(job);

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
        res.status(StatusCodes.CREATED).json({ message: 'Job created', job: newJob });
    } else {
        throw new BadRequestError('Title and description are required');
    }
}

export const updateJob = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const timeLogged = req.body.timeLogged;

    const job = await Job.findOne({ id: id });
    if (!job) throw new NotFoundError('Job not found');

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
    res.status(StatusCodes.OK).json({ message: 'Job updated', job: job });
}

export const deleteJob = async (req, res) => {
    const id = req.params.id;
    const job = await Job.findOne({ id: id });
    if (!job) throw new NotFoundError('Job not found');
    await Job.findOneAndDelete({ id: id });
    res.status(StatusCodes.OK).json({ message: 'Job deleted' });
}

