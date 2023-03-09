/*
 * PI - Input
 */

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Input = () => {
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
                id="outlined-multiline-static"
                label="PI"
                multiline
                rows={20}
            />
        </Box>
    )
};

export default Input;