import { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, useMediaQuery, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VerifyDeleteModal from "./VerifyDeleteModal";
import EditJobModal from "./EditJobModal";

export default function ThisWeekTable() {
    const [jobs, setJobs] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [selectedJob, setSelectedJob] = useState('');

    const smallScreen = useMediaQuery('(max-width:900px)');
    const cellStyle = { maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }

    const deleteJob = (id) => {
        setDeleteId(id);
        setOpenDeleteModal(true);
    }

    const editJob = (job) => {
        setSelectedJob(job);
        setOpenEditModal(true);
    }

    const sanitizeDate = (date) => {
        const d = new Date(date);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

    }

    const sanitizedJobs = jobs.map(job => {
        job.date = new Date(job.date);
        return job;
    });

    const getWeek = () => {
        const now = new Date(); //get the current date
        const startDay = 1; //0=sunday, 1=monday etc.
        const d = now.getDay(); //get the current day
        const monday = new Date(now.valueOf() - (d <= 0 ? 7 - startDay : d - startDay) * 86400000); //rewind to start day
        const tuesday = new Date(monday.valueOf() + 1 * 86400000); //add 1 day to get next day
        const wednesday = new Date(monday.valueOf() + 2 * 86400000);
        const thursday = new Date(monday.valueOf() + 3 * 86400000);
        const friday = new Date(monday.valueOf() + 4 * 86400000);
        const saturday = new Date(monday.valueOf() + 5 * 86400000);
        const sunday = new Date(monday.valueOf() + 6 * 86400000); //add 6 days to get last day
        return [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
    }

    const week = getWeek();

    useEffect(() => {
        fetch('http://localhost:8000/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    return (
        <TableContainer style={{ width: '90%' }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant='h6'>Job</Typography>
                        </TableCell>
                        {week && week.map((day) => {
                            return (
                                <TableCell align="center" key={day.toDateString()}>
                                    <Typography fontSize='16px' variant='h6'>{daysOfWeek[day.getDay()]}</Typography>
                                    <Typography fontSize='12px' variant='h6'>{day.toDateString().split(' ')[1]} {day.toDateString().split(' ')[2]}</Typography>
                                </TableCell>
                            )

                        })}
                    </TableRow >
                </TableHead >
                <TableBody>
                    {sanitizedJobs.map(job => {
                        return <TableRow key={job._id}>
                            <TableCell style={cellStyle}>{job.title}</TableCell>
                        </TableRow>;
                    })}
                </TableBody>
            </Table >
            <VerifyDeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} id={deleteId} />
            <EditJobModal open={openEditModal} setOpen={setOpenEditModal} job={selectedJob} />
        </TableContainer >
    );
}