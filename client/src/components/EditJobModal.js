import { Modal, TextField, Typography, Button, Stack } from '@mui/material';
import style from '../styles/modals';
import { useEffect, useState } from 'react';

export default function EditJobModal({ open, setOpen, job }) {

    const [title, setTitle] = useState('');
    const [hours, setHours] = useState(0);
    console.log(hours);

    const handleClose = () => {
        setOpen(false);
    }

    const editJob = () => {
        try {
            fetch(`http://localhost:8000/jobs?id=${job._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    hours
                })
            })
                .then(res => res.json());
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (job) {
            setTitle(job.title);
            setHours(Number(job.hours));
        }
    }, [job]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack
                direction='column'
                spacing={2}
                sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Make Changes
                </Typography>
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    label="Hours"
                    type='number'
                    variant="outlined"
                    value={hours}
                    onChange={e => setHours(Number(e.target.value))}
                />
                {(title.length === 0 || hours === 0) &&
                    <Typography variant='caption' color='error'>
                        Please fill out all fields
                    </Typography>
                }
                <Stack direction='row' spacing={2} justifyContent='center'>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={editJob}>Save</Button>
                </Stack>
            </Stack>
        </Modal>
    );
}