import { Modal, Button, Typography, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#eee',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function AddJobModal(props) {
    const { open, handleClose } = props;
    const [title, setTitle] = useState('');
    const [hours, setHours] = useState(0);

    const closeModal = () => {
        setTitle('');
        setHours(0);
        handleClose();
    }

    const handleSubmit = () => {
        if (hours > 0 && title.length > 0) {
            // Send the data to the server
            fetch('http://localhost:8000/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    hours
                })
            });

            window.location.reload();
        }
    }
    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="Add a new Job modal"
            aria-describedby="Modal used for adding new jobs to be tracked on the dashboard."
        >
            <Stack
                sx={style}
                direction='column'
                spacing={2}
            >
                <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
                    Add a new Job
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
                    onChange={e => setHours(e.target.value)}
                />
                {(title.length === 0 || hours === 0) &&
                    <Typography variant='caption' color='error'>
                        Please fill out all fields
                    </Typography>
                }
                <Stack
                    direction='row'
                    spacing={2}
                    justifyContent='center'
                    alignItems='center'
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={closeModal}
                    >Cancel</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >Save</Button>

                </Stack>
            </Stack>
        </Modal>
    )
}