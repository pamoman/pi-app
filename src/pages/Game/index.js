/*
 * Game
 */

import React, { useState, useEffect } from 'react';
import { programRequests, playerRequests } from '../../api';
import { Stack, Box, Button, TextField, MenuItem, Typography, Divider } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import pi from '../../assets/pi';
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
        setScore(current);

        if (quit) {
            const res = endGame(current);

            setResult(res);

            setShowResult(true);

            const data = {
                name: player,
                class: klass,
                score: res.score
            };
    
            playerRequests.create({ data });
        }
    };

    const endGame = (current) => {
        const currentAsArray = current.split('');

        const res = currentAsArray.reduce((game, char) => {
            game.str += char;

            const pos = game.str.length - 1;

            // eslint-disable-next-line
            if (char != pi[pos]) {
                game.errors.push(pos);
            }

            if (!game.errors.length) {
                game.score++;
            }

            return game;

        }, {
            str: '',
            errors: [],
            score: 0
        });

        return res;
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

            <Result
                open={showResult}
                onClose={resetGame}
                score={result?.score}
                details={result?.str?.split('').map((c, i) => {
                    if (result?.errors?.includes(i)) {
                        return (
                            <>
                                <span style={{ color: 'red', fontWeight: 'bold' }}>{c}</span>
                                (<span style={{ color: '#66FF99', fontWeight: 'bold' }}>{`${pi[i]}`}</span>)
                            </>
                        );
                    }
                    return c;
                })}
            />
        </Stack>
    )
};

export default Game;