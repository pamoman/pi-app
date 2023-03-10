/*
 * Leaderboard
 */

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { playerRequests } from '../../api';
import { styled } from '@mui/material/styles';
import { Stack, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { TableContainer, TableHead, TableRow, Table, TableBody } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const Leaderboard = () => {
    const socket = io(process.env.REACT_APP_STRAPI_URL);
    const [isConnected, setIsConnected] = useState(socket.connected);

    const [newPlayer, setNewPlayer] = useState();
    const [alertNewPlayer, setAlertNewPlayer] = useState(false);
    const [players, setPlayers] = useState([]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
      

    useEffect(() => {
        playerRequests.getMany({ limit: 20 }).then(res => {
            const { data } = res || {};

            setPlayers(data);
        });
    }, [newPlayer]);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
      
        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('new-player', (data) => {
            setNewPlayer(data);
            setAlertNewPlayer(true);
        });
      
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('new-player');
        };
    }, []);

    return (
        <Stack spacing={4}>
            <Typography variant="h3" align="center">Pi Leaderboard</Typography>

            <Snackbar open={alertNewPlayer} autoHideDuration={6000} onClose={() => setAlertNewPlayer(false)}>
                <Alert onClose={() => setNewPlayer(null)} severity="info" sx={{ width: '100%' }}>
                    {newPlayer?.name} fick {newPlayer?.score} decimaler!
                </Alert>
            </Snackbar>

            <TableContainer sx={{ overFlow: 'auto'}} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Plats</StyledTableCell>
                            <StyledTableCell>Spelare</StyledTableCell>
                            <StyledTableCell>Klass</StyledTableCell>
                            <StyledTableCell>Score</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {players.map((player, pos) => (
                            <StyledTableRow key={player.id}>
                                <StyledTableCell>
                                    {pos + 1}
                                </StyledTableCell>

                                <StyledTableCell>
                                    {player?.attributes?.name}
                                </StyledTableCell>
                                
                                <StyledTableCell>
                                    {player?.attributes?.class?.data?.attributes?.name}
                                </StyledTableCell>

                                <StyledTableCell>
                                    {player?.attributes?.score}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={true}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                {isConnected ?
                    <Alert severity="success" sx={{ width: '100%' }} />

                    :

                    <Alert severity="error" sx={{ width: '100%' }} />
                }
            </Snackbar>
        </Stack>
    )
};

export default Leaderboard;