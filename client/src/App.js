import { useState } from 'react';
import JobsTable from './components/JobsTable';
import { Button, Stack } from '@mui/material'
import AddJobModal from './components/AddJobModal';


function App() {
  const [addJobOpen, setAddJobOpen] = useState(false);
  const toggleAddJobOpen = () => setAddJobOpen(prev => !prev);
  return (
    <Stack
      backgroundColor='lightgray'
      height='100vh'
      padding='16px'
      direction="column"
      spacing={2}
      alignItems='center'
      justifyContent='center'
    >
      <JobsTable />
      <Button
        variant="contained"
        color="primary"
        onClick={toggleAddJobOpen}
      >Add Job</Button>
      <AddJobModal open={addJobOpen} handleClose={toggleAddJobOpen} />
    </Stack>
  );
}

export default App;
