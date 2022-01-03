import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ProfileHsLink({dataTitle, dataId, data, expires, handleSubmit}) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Box component="form">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={10}>
          <Box id={dataId} sx={{ display: 'flex', alignItems: 'flex-end', width: '100%'}}>
            <Chip label={data ? `${expires} Days Remaining` : "Active"} color={data ? "error" : "success"} sx={{mr: 1}} />
            <TextField
              disabled={data ? true : false}
              id={dataId}
              label={dataTitle}
              variant="standard" 
              sx={{width: '100%'}} 
            />
          </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button disabled={data ? true : false} onClick={handleSubmit} sx={{mt: 2}} variant='outlined' fullWidth>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
    
  );
}

export default ProfileHsLink;