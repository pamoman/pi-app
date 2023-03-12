/*
 * Pi - New Score
 */

import React, { useEffect } from 'react';
import { Modal, Stack, Typography } from '@mui/material';

const NewScore = ({ open, onClose, autoHideDuration, player, ...props }) => {
    const { name, score, stats } = player || {};
    const { position = null, shared = false } = stats || {};

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

    useEffect(() => {
        if (open && autoHideDuration) {
            const timer = setTimeout(onClose, autoHideDuration);

            return () => clearTimeout(timer);
        }
    }, [open]);
      
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="Ny Pi resultat"
            aria-describedby="Ny Pi resultat"
            {...props}
        >
            <Stack spacing={4} sx={style}>
                <Typography align="center" variant="h2">Ny Resultat</Typography>

                <Typography align="center" variant="h3">{name}</Typography>

                <Typography align="center" variant="h4">
                    {`Resultat: ${score}`}
                    <br />
                    {`${shared ? 'Delad plats' : 'Plats'}: ${position}`}
                </Typography>
            </Stack>
        </Modal>
    )
};

export default NewScore;