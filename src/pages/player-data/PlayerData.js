import * as React from 'react';
import { Box } from '@material-ui/core';
import { Container, Toolbar, Grid } from '@mui/material';
import Title from '../../components/title/Title';
import { DataGrid } from '@mui/x-data-grid';

function PlayerDataPage() {
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Title>Player Data</Title>
            <div style={{ height: '75vh', width: '100%' }}>
              <DataGrid rows={rows} columns={columns} textAlign='center' />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const columns = [
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'id', headerName: 'ID', width: 100, type: 'number', editable: true },
  { field: 'grad', headerName: 'Grad Yr', width: 100, type: 'number', editable: true },
  { field: 'pos', headerName: 'Position', width: 100, type: 'number', editable: true },
  { field: 'wb', headerName: "50's WB", width: 100, type: 'number', editable: true },
  { field: '300', headerName: "300's", width: 100, type: 'number', editable: true },
  { field: 'broad', headerName: 'Broad Jump', width: 125, type: 'number', editable: true },
  { field: 'vertical', headerName: 'Vertical Jump', width: 125, type: 'number', editable: true },
];

const rows = [
  {
    id: 1,
    name: 'John Smith',
    grad: 25,
    pos: 'M',
    wb: 500,
    300: 80,
    broad: 63,
    vertical: 13
  },
];

export default PlayerDataPage;