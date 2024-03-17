import { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VerifyDeleteModal from "./VerifyDeleteModal";
import EditJobModal from "./EditJobModal";

export default function AllJobsTable() {
    const [jobs, setJobs] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [selectedJob, setSelectedJob] = useState('');

    const smallScreen = useMediaQuery('(max-width:900px)');


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
    const sortedJobs = sanitizedJobs.sort((a, b) =>
        b.date.getTime() - a.date.getTime()
    );


    useEffect(() => {
        fetch('http://localhost:8000/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);


    return (
        <TableContainer style={{
            width: smallScreen ? '90%' : '70%',
            maxHeight: '750px'
        }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width='40%'>Job</TableCell>
                        <TableCell align="center" width='15%'>Hours</TableCell>
                        <TableCell width='15%'>Date</TableCell>
                        <TableCell align="center" width='5%'>Edit</TableCell>
                        <TableCell align="center" width='5%'>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedJobs.map(job => (
                        <TableRow key={job._id}>
                            <TableCell style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.title}</TableCell>
                            <TableCell align="center">{job.hours}</TableCell>
                            <TableCell>{sanitizeDate(job.date)}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => { editJob(job) }}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => { deleteJob(job._id) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <VerifyDeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} id={deleteId} />
            <EditJobModal open={openEditModal} setOpen={setOpenEditModal} job={selectedJob} />
        </TableContainer>
    );
}