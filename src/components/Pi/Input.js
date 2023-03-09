/*
 * PI - Input
 */

import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Input = ({ score, onChange }) => {
    const handleOnChange = (e) => {
        const [_, value] =  e.target.value.split('3.');

        onChange({ current: value });
    };

    return (
        <Box
            component="form"
            sx={{
                p: 8,
                '& .MuiTextField-root': { width: '100%' }
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="piInput"
                label="PI"
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
            />
        </Box>
    )
};

export default Input;