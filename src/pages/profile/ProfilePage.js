import * as React from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../../components/title/Title';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import { firestore } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

import ProfileDataCardGrid from '../../components/profile-data-card-grid/ProfileDataCardGrid';
import ProfileHsLinkGrid from '../../components/profile-hs-link-grid/ProfileHsLinkGrid';

class ProfilePage extends React.Component {
  state = {}

  componentDidMount() {
    let self = this;

    // Get the current user's data if not an admin
    if (!this.props.currentUser.isAdmin) {
      async function getUserData() {
        const docRef = doc(firestore, self.props.currentUser.team, self.props.currentUser.id, "data", self.props.currentUser.id);
        const docSnap = await getDoc(docRef);

        const userDataObj = docSnap.data();
        self.setState({
          ...userDataObj
        });
      }

      getUserData();
    }
  }

  render() {
    const { grad, position } = this.state;

    const currentUser = this.props.currentUser;
    
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 100, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Title>{currentUser.displayName}</Title>
                
                <Stack direction="row" spacing={2}>
                  {currentUser.isAdmin 
                  ? <Chip label="Admin" /> 
                  : <>
                      <Chip label={position ? position : 'POS'} />
                      <Chip label={grad ? grad : 'GRAD'} />
                    </>
                  }
                </Stack>
              </Paper>
            </Grid>

            {/* Checks to see if the user is an admin before making data cards */}
            {/*  PLAYER DATA CARDS */}
            {currentUser.isAdmin 
              ? <></> 
              : <ProfileDataCardGrid />
            }

            {/* HIGH SCHOOL STUDENTS UPLOAD LINKS */}
            {currentUser.team === 'highschool' && !currentUser.isAdmin
              ? <ProfileHsLinkGrid />
              : <></>
            }

          </Grid>
        </Container>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(ProfilePage);