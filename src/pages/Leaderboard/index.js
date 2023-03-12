/*
 * Leaderboard
 */

import React, { useState, useEffect } from 'react';
import { useSetting, useSocket } from '../../contexts';
import { playerRequests } from '../../api';
import { StyledTableRow, StyledTableCell, NewScore } from '../../components';
import { Stack, Paper, Typography } from '@mui/material';
import { TableContainer, TableHead, TableRow, Table, TableBody } from '@mui/material';

const Leaderboard = () => {
    const settings = useSetting();
    const socket = useSocket();
    const [newPlayer, setNewPlayer] = useState();
    const [alertNewPlayer, setAlertNewPlayer] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if (settings) {
            const { limit } = settings || {};
        
            playerRequests.getLeaderboard({ limit }).then(res => {
                const data = res || [];

                setPlayers(data);
            });
        }
    }, [newPlayer, settings]);

    useEffect(() => {
        socket.on('new-player', (data) => {
            setNewPlayer(data);
            setAlertNewPlayer(true);
        });
      
        return () => {
            socket.off('new-player');
        };
    }, [socket]);

    return (
        <Stack spacing={4}>
            <Typography variant="h3" align="center">Pi Leaderboard</Typography>

            <NewScore
                open={alertNewPlayer}
                onClose={() => setAlertNewPlayer(false)}
                autoHideDuration={6000}
                player={newPlayer}
            />

            <TableContainer sx={{ overFlow: 'auto' }} component={Paper}>
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
                        {players.map(player => (
                            <StyledTableRow key={player.id}>
                                <StyledTableCell>
                                    {player?.stats?.position}
                                </StyledTableCell>

                                <StyledTableCell>
                                    {player?.name}
                                </StyledTableCell>
                                
                                <StyledTableCell>
                                    {player?.class?.name}
                                </StyledTableCell>

                                <StyledTableCell>
                                    {player?.score}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
};

export default Leaderboard;