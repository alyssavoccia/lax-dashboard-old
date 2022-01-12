import * as React from 'react';
// import { connect } from 'react-redux';

import Title from '../../components/title/Title'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import PerformanceRelativeToPeers from '../../components/charts/PerformanceRelativeToPeers'
import StrengthsAssessment from '../../components/charts/StrengthsAssessment';
import Percentiles from '../../components/charts/Percentiles.js';
import TapScore from '../../components/charts/TapScore.js';

function DashboardGrid() {
  return (
    <Grid container spacing={3}>
      {/* ROW 1 */}
      {/* PERFORMANCE RELATIVE TO PEERS */}
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
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
      {/* PERCENTILE / 5-10-5 */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 300,
          }}
        >
          <Percentiles title="5-10-5" />
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
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Strengths / Areas for Improvement</Title>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DashboardGrid;