/*
 * Game
 */

import React, { useState, useEffect } from 'react';
import { classRequests, playerRequests } from '../../api';
import { Stack, Box, Button, TextField, Select, MenuItem, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import pi from './pi';
import { Input, Result } from '../../components';

const Game = () => {
    const [classes, setClasses] = useState([]);
    const [player, setPlayer] = useState("");
    const [klass, setKlass] = useState("");
    const [start, setStart] = useState(false);
    const [score, setScore] = useState("");
    const [result, setResult] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        classRequests.getAll().then(res => {
            const { data } = res || {};

            setClasses(data);
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
                score: current
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
        setKlass('');
        setStart(false);
        setScore('');
        setResult(false);
        setShowResult(false);
    };

    return (
        <Stack spacing={4}>
            <Typography variant="h3">Pamo PI</Typography>

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
                            labelId="Klass"
                            id="player-class"
                            label="Klass"
                            value={klass}
                            defaultValue=""
                            onChange={(e) => setKlass(e.target.value)}
                            disabled={start}
                        >
                            {classes.map(c => (
                                <MenuItem value={c.id}>{c?.attributes?.name}</MenuItem>
                            ))}
                        </TextField>
                    </Stack>

                    <Stack justifyContent={"center"} spacing={4} direction="row">
                        {!start ?
                            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                                Start
                            </Button>

                            :

                            <Button variant="contained" endIcon={<SendIcon />} onClick={quitGame}>
                                Stopp
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