/*
 * Layout
 */

import { Stack, Box, FormControl, Button, TextField, Typography, Divider } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Box sx={{ p: 2 }}>
            {children}
        </Box>
    )
};

export default Layout;