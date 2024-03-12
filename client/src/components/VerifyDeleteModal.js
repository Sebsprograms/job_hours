import { Modal, Box, Typography, Button, Stack } from '@mui/material';
import style from '../styles/modals';


export default function VerifyDeleteModal({ open, setOpen, id }) {
    const handleClose = () => {
        setOpen(false);
    }

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

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to delete this job?
                </Typography>
                <Stack direction='row' spacing={2} justifyContent='center'>

                    <Button onClick={() => { deleteJob(id) }}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </Stack>
            </Box>
        </Modal>
    );
}