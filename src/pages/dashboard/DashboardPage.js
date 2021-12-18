import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import PerformanceRelativeToPeers from '../../components/charts/PerformanceRelativeToPeers'
import StrengthsAssessment from '../../components/charts/StrengthsAssessment';
import Percentiles from '../../components/charts/Percentiles.js';
import TapScore from '../../components/charts/TapScore.js';

function DashboardPage() {

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
      <Toolbar />

      {/* DASHBOARD GRID ITEMS */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* ROW 1 */}
          {/* PERFORMANCE RELATIVE TO PEERS */}
          <Grid item xs={12} md={8} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <PerformanceRelativeToPeers />
            </Paper>
          </Grid>
          {/* STRENGTHS ASSESSMENT */}
          <Grid item xs={12} md={4} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <StrengthsAssessment />
            </Paper>
          </Grid>

          {/* ROW 2 */}
          {/* PERCENTILE / 50'S WALL BALL */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <Percentiles title="50's Wall Ball" />
            </Paper>
          </Grid>
          {/* PERCENTILE / 300's */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <Percentiles title="300's" />
            </Paper>
          </Grid>
          {/* PERCENTILE / BROAD JUMP */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <Percentiles title="Broad Jump" />
            </Paper>
          </Grid>

          {/* ROW 3 */}
          {/* TAP SCORE */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <TapScore />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
              {<h1>Strengths / Weaknesses</h1>}
            </Paper>
          </Grid>
        </Grid>

        {/* <Copyright sx={{ pt: 4 }} /> */}
      </Container>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardPage/>;
}