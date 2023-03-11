/*
 * Leaderboard
 */

import React, { useState, useEffect } from 'react';
import { useSocket } from '../../contexts';
import { playerRequests } from '../../api';
import { StyledTableRow, StyledTableCell, NewScore } from '../../components';
import { Stack, Paper, Typography } from '@mui/material';
import { TableContainer, TableHead, TableRow, Table, TableBody } from '@mui/material';

const Leaderboard = () => {
    const socket = useSocket();
    const [newPlayer, setNewPlayer] = useState();
    const [alertNewPlayer, setAlertNewPlayer] = useState(false);
    const [players, setPlayers] = useState([]);

    const getPosition = (score) => {
        const scores = [score];

        players.forEach(player => {
            const playerScore = player?.attributes?.score;

            if (!scores.includes(playerScore)) {
                scores.push(playerScore);
            }
        });

        const sortedScores = scores.sort((a, b) => b - a);

        return sortedScores.indexOf(score) + 1;
    };

    useEffect(() => {
        playerRequests.getMany({ limit: 20 }).then(res => {
            const { data } = res || {};

            setPlayers(data);
        });
    }, [newPlayer]);

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
                player={newPlayer?.name}
                score={newPlayer?.score}
                pos={players
                    .find(player => player?.id === newPlayer?.id)
                    ? getPosition(newPlayer?.score)
                    : null
                }
                sharedPos={players
                    .filter(player => player?.attributes?.score === newPlayer?.score)?.length > 1
                }
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
                        {players.map((player, index) => (
                            <StyledTableRow key={player.id}>
                                <StyledTableCell>
                                    {getPosition(player?.attributes?.score, index)}
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
        </Stack>
    )
};

export default Leaderboard;