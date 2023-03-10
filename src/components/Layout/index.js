/*
 * Layout
 */

import pi from './pi.png';
import { Stack, Box } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Stack spacing={2}>
            <Box sx={{ p: 2 }} component="header">
                <Stack direction="row" sx={{ height: 40 }}>
                    <Box component="img" src={pi} />
                </Stack>
            </Box>

            <Box sx={{ pl: 8, pr: 8 }}>
                {children}
            </Box>
        </Stack>
    )
};

export default Layout;