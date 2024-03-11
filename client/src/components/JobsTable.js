import { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function JobsTable() {
    const [jobs, setJobs] = useState([]);


    const deleteJob = (id) => {
        try {
            fetch(`http://localhost:8000/jobs?id=${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json());
            window.location.reload();
        } catch (error) {
            console.log(error);
        }

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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}