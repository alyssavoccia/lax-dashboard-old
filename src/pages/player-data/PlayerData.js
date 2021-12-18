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
              <DataGrid rows={rows} columns={columns} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const columns = [
  { field: 'name', headerName: 'Name', width: 200, headerAlign: 'center' },
  { field: 'id', headerName: 'ID', width: 100, headerAlign: 'center' },
  { field: 'grad', headerName: 'Grad Yr', width: 100, type: 'number', headerAlign: 'center' },
  { field: 'pos', headerName: 'Position', width: 100, headerAlign: 'center', editable: true },
  { field: 'wb', headerName: "50's WB", width: 100, type: 'number', headerAlign: 'center', editable: true },
  { field: '300', headerName: "300's", width: 100, type: 'number', headerAlign: 'center', editable: true },
  { field: 'broad', headerName: 'Broad Jump', width: 150, type: 'number', headerAlign: 'center', editable: true },
  { field: 'vertical', headerName: 'Vertical Jump', width: 150, type: 'number', headerAlign: 'center', editable: true },
];

const rows = [
  {
    id: 1,
    name: 'John Smith',
    grad: '2025',
    pos: 'M',
    wb: 500,
    300: 80,
    broad: 63,
    vertical: 13
  },
  {
    id: 2,
    name: 'John Doe',
    grad: '2026',
    pos: 'A',
    wb: 450,
    300: 73,
    broad: 70,
    vertical: 15
  },
];

export default PlayerDataPage;