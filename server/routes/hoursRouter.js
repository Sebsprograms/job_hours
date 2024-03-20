import { Router } from "express";
import {
    addHoursToDate,
    getHoursByDate,
    updateHoursByDate,
    deleteHoursFromDate,
} from '../controllers/hoursController.js';

const router = Router();

router.route('/:id/hours').post(addHoursToDate).get(getHoursByDate).patch(updateHoursByDate).delete(deleteHoursFromDate);

export default router;