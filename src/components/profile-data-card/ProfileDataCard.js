import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function ProfileDataCard({ dataTitle, data }) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 350,
          height: 100,
        },
      }}
    >
      <Paper>
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            {dataTitle}
          </Typography>
          <Typography variant="h5" component="div">
            {data ? data : 'N/A'}
         </Typography>
        </CardContent>
      </Paper>
    </Box>
  );
}



export default (ProfileDataCard);