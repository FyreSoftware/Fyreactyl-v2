import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Copyright } from '@mui/icons-material';

export default function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            <Copyright />
            {' '}
            {new Date().getFullYear().toString()}
            {' '}
            Fyre software
          </Typography>
        </Container>
      </Box>
    </>
  );
}
