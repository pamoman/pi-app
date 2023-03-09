/*
 * Game
 */

import React, { useState, useEffect } from 'react';
import { classRequests } from '../../api';
import { Stack, Box, FormControl, Button, TextField, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import pi from './pi';
import { Input, Result } from '../../components';

const Game = () => {
    const [player, setPlayer] = useState();
    const [klass, setKlass] = useState();
    const [start, setStart] = useState(false);
    const [score, setScore] = useState("3.");
    const [result, setResult] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        classRequests.getAll().then(res => {
            console.log(res);
        });
    }, []);

    const handlePlayer = (e) => {
        e.preventDefault();

        setStart(true);
    };

    const handleGame = ({ current, quit = false }) => {
        const [_, currentPi] = current.split("3.");

        const matchPi = pi.slice(0, currentPi.length);

        if ((currentPi != matchPi) || quit) {
            if (quit) {
                setResult(currentPi.length);
            } else {
                setResult(currentPi.length - 1);
            }

            setShowResult(true);
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
        setScore('3.');
        setResult(false);
        setShowResult(false);
    };

    return (
        <Box>
            <h1>Pamo PI</h1>

            <form onSubmit={handlePlayer}>
                <Stack spacing={4}>
                    <Stack justifyContent={"center"} spacing={4} direction="row">
                        <TextField
                            required
                            id="outlined-required"
                            label="Namn"
                            value={player}
                            onChange={(e) => setPlayer(e.target.value)}
                            disabled={start}
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="Klass"
                            value={klass}
                            onChange={(e) => setKlass(e.target.value)}
                            disabled={start}
                        />
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
            </form>

            {start &&
                <Input score={score} onChange={handleGame} />
            }

            <Result open={showResult} onClose={resetGame} score={result} />
        </Box>
    )
};

export default Game;