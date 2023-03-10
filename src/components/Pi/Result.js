/*
 * PI - Result
 */

import React from 'react';
import { Modal, Stack, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Result = ({ open, onClose, score }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    };
      
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="PI Resultat"
            aria-describedby="Resultat"
        >
            <Stack spacing={4} sx={style}>
                <Typography align="center" variant="h2">Resultat</Typography>

                <Typography align="center" variant="h2">{score}</Typography>

                <Stack justifyContent={"center"} spacing={4} direction="row">
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={onClose}
                    >
                        Starta om
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    )
};

export default Result;