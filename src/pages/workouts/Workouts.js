import * as React from 'react';
import { Box } from '@material-ui/core';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';

function WorkoutsPage() {
  return (
    <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Toolbar />
        <h1>Workouts Page</h1>
      </Container>
    
    </Box>
  )
}

export default WorkoutsPage;