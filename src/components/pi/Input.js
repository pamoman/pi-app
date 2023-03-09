/*
 * PI - Input
 */

import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Input = ({ score, onChange }) => {
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
                value={score}
                onChange={e => onChange({ current: e.target.value})}
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