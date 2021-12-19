import * as React from 'react';
import { connect } from 'react-redux';

import { Box } from '@material-ui/core';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Title from '../../components/title/Title';

import { firestore } from '../../firebase/firebase';

function ProfilePage({ currentUser }) {

  console.log(currentUser);
  // team info

  // if (!currentUser.isAdmin) {
  //   firestore.collection(currentUser.team).doc(currentUser.id).collection('data').doc(currentUser.id).get().then(doc => console.log(doc.data()))
  // }
  


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
        <Title>Welcome, {currentUser.displayName.split(' ')[0]}</Title>
      </Container>
    </Box>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(ProfilePage);