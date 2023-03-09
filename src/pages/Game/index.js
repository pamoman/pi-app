/*
 * Game
 */

import React, { useState, useEffect } from 'react';
import { Stack, Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Input } from '../../components';

const Game = () => {
    const [player, setPlayer] = useState();
    const [klass, setKlass] = useState();
    const [start, setStart] = useState(false);
    const [decimals, setDecimals] = useState(0);

    return (
        <Box>
            <h1>Game Page</h1>
        <Stack>
            <Box>
                <TextField
                    required
                    id="outlined-required"
                    label="Namn"
                    value={player}
                    onChange={(e) => setPlayer(e.target.value)}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Klass"
                    value={klass}
                    onChange={(e) => setKlass(e.target.value)}
                />
            </Box>

            <Button variant="contained" endIcon={<SendIcon />} onClick={() => setStart(prev => !prev)}>
                {start ? 'Stopp': 'Spela'}
            </Button>
        </Stack>

            {start &&

            <Box>
                <Input />
            </Box>

            }
        </Box>
    )
};

export default Game;