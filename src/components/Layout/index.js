/*
 * Layout
 */

import pi from './pi.png';
import { Stack, Box } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Stack spacing={2}>
            <Box sx={{ pl: 4, pr: 4, pt: 4 }} component="header">
                <Stack direction="row" sx={{ height: 40 }}>
                    <Box component="img" src={pi} />
                </Stack>
            </Box>

            <Box sx={{ pl: 16, pr: 16, pb: 4 }}>
                {children}
            </Box>
        </Stack>
    )
};

export default Layout;