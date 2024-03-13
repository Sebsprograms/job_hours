import { Stack } from "@mui/material";
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <Stack direction='column' spacing={2} sx={{ width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link to='/'>Go Home</Link>
        </Stack>
    );
};

export default Error;