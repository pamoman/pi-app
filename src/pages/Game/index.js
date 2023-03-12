/*
 * Game
 */

import React, { useState, useEffect } from 'react';
import { programRequests, playerRequests } from '../../api';
import { Stack, Box, Button, TextField, MenuItem, Typography, Divider } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import pi from './pi';
import { Input, Result } from '../../components';

const Game = () => {
    const [programs, setPrograms] = useState([]);
    const [player, setPlayer] = useState("");
    const [program, setProgram] = useState("");
    const [klass, setKlass] = useState("");
    const [start, setStart] = useState(false);
    const [score, setScore] = useState("");
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        programRequests.getAll().then(res => {
            const { data } = res || {};

            setPrograms(data);
        });
    }, []);

    const handlePlayer = (e) => {
        e.preventDefault();

        setStart(true);
    };

    const handleGame = ({ current, quit = false }) => {
        const matchPi = pi.slice(0, current.length);

        if ((current != matchPi) || quit) {
            let gameScore;

            if (quit) {
                gameScore = current.length;
            } else {
                gameScore = current.length - 1;
            }

            setResult(gameScore);
            setShowResult(true);

            const data = {
                name: player,
                class: klass,
                score: gameScore
            };
    
            playerRequests.create({ data });
        }

        setScore(current);
    };

    const quitGame = () => {
        handleGame({ current: score, quit: true });
    };

    const resetGame = () => {
        setPlayer('');
        setProgram('');
        setKlass('');
        setStart(false);
        setScore('');
        setResult('');
        setShowResult(false);
    };

    return (
        <Stack spacing={4}>
            <Typography variant="h3" align="center">Pi Spel</Typography>

            <Box component="form" onSubmit={handlePlayer}>
                <Stack spacing={4}>
                    <Stack justifyContent={"center"} spacing={4} direction="row">
                        <TextField
                            sx={{ width: 200 }}
                            required
                            id="player"
                            label="Namn"
                            value={player}
                            onChange={(e) => setPlayer(e.target.value)}
                            disabled={start}
                        />

                        <TextField
                            select
                            sx={{ width: 200 }}
                            required
                            id="player-program"
                            label="Program"
                            value={program}
                            defaultValue=""
                            onChange={(e) => setProgram(e.target.value)}
                            disabled={start || !player}
                        >
                            {programs.map(p => (
                                <MenuItem key={p.id} value={p.id}>{p?.attributes?.name}</MenuItem>
                            ))}

                            {!programs.length > 0 &&
                                <MenuItem key={"placeholder"} value={""} disabled>{'Finns ingen'}</MenuItem>
                            }
                        </TextField>

                        <TextField
                            select
                            sx={{ width: 200 }}
                            required
                            id="player-class"
                            label="Klass"
                            value={klass}
                            defaultValue=""
                            onChange={(e) => setKlass(e.target.value)}
                            disabled={start || !program}
                        >
                            {programs.find(p => p.id === program)?.attributes?.classes?.data?.map(c => (
                                <MenuItem key={c.id} value={c.id}>{c?.attributes?.name}</MenuItem>
                            ))}

                            {!programs.length > 0 &&
                                <MenuItem key={"placeholder"} value={""} disabled>{'Finns ingen'}</MenuItem>
                            }
                        </TextField>
                    </Stack>

                    <Stack justifyContent={"center"} spacing={4} direction="row">
                        {!start ?
                            <Button sx={{ width: 664}} type="submit" variant="contained" endIcon={<PlayCircleIcon />}>
                                Spela
                            </Button>

                            :

                            <Button sx={{ width: 664}} variant="contained" endIcon={<CancelIcon />} onClick={quitGame}>
                                Avsluta
                            </Button>
                        }
                    </Stack>

                    <Divider variant="middle" />
                </Stack>
            </Box>

            {start &&
                <Input score={score} onChange={handleGame} />
            }

            <Result open={showResult} onClose={resetGame} score={result} />
        </Stack>
    )
};

export default Game;