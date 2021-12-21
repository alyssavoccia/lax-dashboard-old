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

import ProfileDataCard from '../../components/profile-data-card/ProfileDataCard';

class ProfilePage extends React.Component {
  state = {}

  componentDidMount() {
    let self = this;
    console.log(this.props.currentUser);
    // let userData = {};
    // team info
    if (!this.props.currentUser.isAdmin) {
      async function getUserData() {
        const docRef = doc(firestore, self.props.currentUser.team, self.props.currentUser.id, "data", self.props.currentUser.id);
        const docSnap = await getDoc(docRef);

        const userDataObj = docSnap.data();
        self.setState({
          ...userDataObj
        })
        // userData = Object.assign(userData, userDataObj);
      }
      getUserData();
    }
  }

    //   // userData = firestore.collection(currentUser.team).doc(currentUser.id).collection('data').doc(currentUser.id).get().then(doc => doc.data())
  render() {
    const { agility, broad, forty, grad, position, three, vertical, wb } = this.state;
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
                <Title>{this.props.currentUser.displayName}</Title>
                <Stack direction="row" spacing={2}>
                  {this.props.currentUser.isAdmin 
                  ? <Chip label="Admin" /> 
                  : <>
                      <Chip label={position} />
                      <Chip label={grad} />
                    </>
                  }
                </Stack>
              </Paper>
            </Grid>

            {/* Checks to see if the user is an admin before making data cards */}
            {this.props.currentUser.isAdmin ? <></> : (
            <>
              {/* ROW 1 */}
              <Grid item xs={4}>
                <ProfileDataCard 
                  dataTitle="50's Wall Ball" 
                  data={wb}
                />
              </Grid>
              <Grid item xs={4}>
                <ProfileDataCard 
                  dataTitle="300's" 
                  data={three}
                />
              </Grid>
              <Grid item xs={4}>
                <ProfileDataCard 
                  dataTitle="Broad Jump" 
                  data={broad}
                />
              </Grid>

              {/* ROW 2 */}
              <Grid item xs={4}>
                <ProfileDataCard 
                  dataTitle="Vertical Jump" 
                  data={vertical}
                />
              </Grid>
              <Grid item xs={4}>
                <ProfileDataCard 
                  dataTitle="5-10-5" 
                  data={agility}
                />
              </Grid>
              <Grid item xs={4}>
                <ProfileDataCard 
                  dataTitle="40yd Dash" 
                  data={forty}
                />
              </Grid>
            </>)}

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