import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ProfileHsLink({dataTitle, dataId, handleSubmit}) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Box component="form">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={10}>
          <Box id={dataId} sx={{ display: 'flex', alignItems: 'flex-end', width: '100%'}}>
            <TextField
              id={dataId}
              label={dataTitle}
              variant="standard" 
              sx={{width: '100%'}} 
            />
          </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button onClick={handleSubmit} sx={{mt: 2}} variant='outlined' fullWidth>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
    
  );
}

export default ProfileHsLink;