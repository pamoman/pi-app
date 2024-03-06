/*
 * Layout
 */

import React, { useState, useEffect } from 'react';
import { useSocket } from '../../contexts';
import { Stack, Box, Snackbar, Alert, Tooltip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import pi from './pi.png';

const Layout = ({ children }) => {
    const socket = useSocket();
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
      
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
      
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [socket]);

    return (
        <Stack sx={{ backgroundColor: '#171d25', color: '#FFFFFF' }} spacing={2}>
            <Box sx={{ pl: 4, pr: 4, pt: 4 }} component="header">
                <Stack direction="row" sx={{ height: 40 }}>
                    <Box sx={{ p: 1, width: 64, height: 64, background: 'white', borderRadius: 4 }}>
                        <Box component="img" src={pi} sx={{ height: '100%' }} />
                    </Box>

                    <Snackbar
                        open={true}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        {isConnected ?
                            <Alert
                                icon={
                                    <Tooltip title="Uppkopplad">
                                        <CheckCircleOutlineIcon fontSize="inherit" />
                                    </Tooltip>}
                                severity="success"
                                sx={{ background: 'none' }}
                            />

                            :

                            <Alert
                                icon={
                                    <Tooltip title="Nedkopplad">
                                        <ErrorOutlineIcon fontSize="inherit" />
                                    </Tooltip>}
                                severity="error"
                                sx={{ background: 'none' }}
                            />
                        }
                    </Snackbar>
                </Stack>
            </Box>

            <Box sx={{ pb: 4, pl: { xs: 4, lg: 16 }, pr: { xs: 4, lg: 16 } }}>
                {children}
            </Box>
        </Stack>
    )
};

export default Layout;