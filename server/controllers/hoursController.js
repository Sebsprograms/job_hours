import { nanoid } from "nanoid";
import Job from '../models/job.js';
import { NotFoundError, BadRequestError } from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";
import { isValidDate, sanitizeDate } from '../utils/helpers.js';

export const addHoursToDate = async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;
    const hours = req.body.hours;

    if (!isValidDate(date)) throw new BadRequestError('Invalid date');

    const job = await Job.findOne({ id: id });
    if (!job) throw new NotFoundError('Job not found');

    const newDate = new Date(date);
    const comparsion = sanitizeDate(newDate);
    if (job.timeLogged.some(log => {
        const logdate = new Date(log.date);
        const logcomparsion = sanitizeDate(logdate);
        return logcomparsion === comparsion;

    })) throw new BadRequestError('Hours already logged for this date');


    job.timeLogged.push({ id: nanoid(10), date: date, hours: hours });
    await job.save();
    res.status(StatusCodes.CREATED).json({ message: 'Hours added', job: job });
}

export const getHoursByDate = async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;

    if (!isValidDate(date)) throw new BadRequestError('Invalid date');

    const job = await Job.findOne({ id: id });
    if (!job) throw new NotFoundError('Job not found');

    const hours = job.timeLogged.find(log => {
        const logDate = new Date(log.date);
        return sanitizeDate(logDate) === sanitizeDate(new Date(date));
    });

    if (!hours) throw new NotFoundError('Hours not found');

    res.status(StatusCodes.OK).json(hours);
}

export const updateHoursByDate = async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;
    const hours = req.body.hours;

    if (!isValidDate(date)) throw new BadRequestError('Invalid date');

    const job = await Job.findOne({ id: id });
    if (!job) throw new NotFoundError('Job not found');

    const log = job.timeLogged.find(log => {
        const logDate = new Date(log.date);
        return sanitizeDate(logDate) === sanitizeDate(new Date(date));
    });

    if (!log) throw new NotFoundError('Hours not found');

    if (Number(hours) <= 0) throw new BadRequestError('Hours must be greater than 0');

    log.hours = hours;
    await job.save();
    res.status(StatusCodes.OK).json({ message: 'Hours updated', job: job });
}

export const deleteHoursFromDate = async (req, res) => {
    const id = req.params.id;
    const date = req.body.date;

    if (!isValidDate(date)) throw new BadRequestError('Invalid date');

    const job = await Job.findOne({ id: id });
    if (!job) throw new NotFoundError('Job not found');

    const log = job.timeLogged.find(log => {
        const logDate = new Date(log.date);
        return sanitizeDate(logDate) === sanitizeDate(new Date(date));
    });

    if (!log) throw new NotFoundError('Hours not found');

    job.timeLogged = job.timeLogged.filter(log => {
        const logDate = new Date(log.date);
        return sanitizeDate(logDate) !== sanitizeDate(new Date(date));
    });

    await job.save();
    res.status(StatusCodes.OK).json({ message: 'Hours deleted', job: job });
}