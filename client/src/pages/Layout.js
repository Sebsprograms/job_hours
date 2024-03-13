import { Stack } from "@mui/material"
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <Stack direction='column' spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction='row' spacing={2} sx={{ width: '100%', height: '32px', justifyContent: 'center', alignItems: 'center' }}>
                <Link to='/'>Home</Link>
                <Link to='jobs'>Jobs</Link>
            </Stack>
            <Outlet />
        </Stack>
    );
}

export default Layout;