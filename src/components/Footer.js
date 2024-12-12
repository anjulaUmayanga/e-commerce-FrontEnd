// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#243642', // Footer background color
        color: '#fff', // Text color
        padding: '1rem',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Anjula Umayanga. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
