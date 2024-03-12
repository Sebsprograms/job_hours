import { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VerifyDeleteModal from "./VerifyDeleteModal";
import EditJobModal from "./EditJobModal";

export default function JobsTable() {
    const [jobs, setJobs] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [selectedJob, setSelectedJob] = useState('');

    const deleteJob = (id) => {
        setDeleteId(id);
        setOpenDeleteModal(true);
    }

    const editJob = (job) => {
        setSelectedJob(job);
        setOpenEditModal(true);
    }


    useEffect(() => {
        fetch('http://localhost:8000/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Job</TableCell>
                        <TableCell>Hours</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map(job => (
                        <TableRow key={job._id}>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.hours}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => { deleteJob(job._id) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => { editJob(job) }}>
                                    <EditIcon />
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