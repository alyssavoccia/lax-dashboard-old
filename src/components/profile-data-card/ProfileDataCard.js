import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// import { connect } from 'react-redux';
// import { firestore } from '../../firebase/firebase';

function ProfileDataCard({ dataTitle, data }) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
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
            {data}
         </Typography>
        </CardContent>
      </Paper>
    </Box>
  );
}



export default (ProfileDataCard);