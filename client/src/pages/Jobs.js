import { useState } from 'react';
import AllJobsTable from '../components/AllJobsTable';
import { Button, Stack, Typography } from '@mui/material'
import AddJobModal from '../components/AddJobModal';
import ThisWeekTable from '../components/ThisWeekTable';


function Jobs() {
    const [addJobOpen, setAddJobOpen] = useState(false);
    const toggleAddJobOpen = () => setAddJobOpen(prev => !prev);
    return (
        <Stack
            backgroundColor='lightgray'
            width='100%'
            padding='16px'
            direction="column"
            spacing={2}
            alignItems='center'
            justifyContent='center'
        >
            <Typography variant='h1'>This Week</Typography>
            <ThisWeekTable />
            <Button
                variant="contained"
                color="primary"
                onClick={toggleAddJobOpen}
            >Add Job</Button>
            <Typography variant='h3'>All Jobs</Typography>
            <AllJobsTable />

            <AddJobModal open={addJobOpen} handleClose={toggleAddJobOpen} />
        </Stack>
    );
}

export default Jobs;
