/*
 * PI - Input
 */

import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Input = ({ score, onChange }) => {
    const handleOnChange = (e) => {
        const regex = /^[0-9\b]+$/;
        // eslint-disable-next-line
        const [_, value] =  e.target.value.split('3.');

        if (value === "" || regex.test(value)) {
            onChange({ current: value });
        }
    };

    const handlePrevent = (e) => {
        e.preventDefault();
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '100%' }
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="piInput"
                label="Pi"
                multiline
                rows={20}
                value={'3.' + score}
                onChange={handleOnChange}
                autoFocus
                focused
                onFocus={(e) =>
                    e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                )}
                onContextMenu={handlePrevent}
                onPaste={handlePrevent}
                onCut={handlePrevent}
                onCopy={handlePrevent}
            />
        </Box>
    )
};

export default Input;