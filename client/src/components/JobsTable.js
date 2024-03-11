import { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AreYouSureModal from "./AreYouSureModal";

export default function JobsTable() {
    const [jobs, setJobs] = useState([]);
    const [open, setOpen] = useState(false);


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
                                <IconButton onClick={() => { setOpen(true) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <AreYouSureModal open={open} setOpen={setOpen} id={job._id} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}