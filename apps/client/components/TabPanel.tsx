import React from 'react';
import { Box, Typography } from '@mui/material';

interface TabPanelProps {
  children: React.ReactNode;
  id: string;
  value: string;
}

export default function TabPanel(props: TabPanelProps) {
  const {
    children, value, id, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id={id}
      aria-labelledby={id}
      {...other}
    >
      {value === id && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
