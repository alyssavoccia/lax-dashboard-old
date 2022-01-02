import * as React from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../../components/title/Title';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import { firestore } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

import ProfileDataCard from '../../components/profile-data-card/ProfileDataCard';
import ProfileLink from '../../components/profile-hs-link/ProfileLink';

class ProfilePage extends React.Component {
  state = {}

  componentDidMount() {
    let self = this;

    // team info
    if (!this.props.currentUser.isAdmin) {
      async function getUserData() {
        const docRef = doc(firestore, self.props.currentUser.team, self.props.currentUser.id, "data", self.props.currentUser.id);
        const docSnap = await getDoc(docRef);

        const userDataObj = docSnap.data();
        self.setState({
          ...userDataObj
        });
      }

      async function getUserLinks() {
        const linkDocRef = doc(firestore, self.props.currentUser.team, self.props.currentUser.id, "links", self.props.currentUser.id);
        const linkDocSnap = await getDoc(linkDocRef);

        const userLinkObj = linkDocSnap.data();
        self.setState({
          ...userLinkObj
        });
      }
      getUserData();
      getUserLinks();
    }
  }

    //   // userData = firestore.collection(currentUser.team).doc(currentUser.id).collection('data').doc(currentUser.id).get().then(doc => doc.data())
  render() {
    const { agility, broad, forty, grad, position, three, vertical, wb, agilityLink, broadLink, fortyLink, threeLink, verticalLink, wbLink } = this.state;
    
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
                      <Chip label={position ? position : 'POS'} />
                      <Chip label={grad ? grad : 'GRAD'} />
                    </>
                  }
                </Stack>
              </Paper>
            </Grid>

            {/* Checks to see if the user is an admin before making data cards */}
            {this.props.currentUser.isAdmin ? <></> : (
            <>
              {/* ROW 1 */}
              <Grid item xs={12} sm={6} md={4}>
                <ProfileDataCard 
                  dataTitle="50's Wall Ball" 
                  data={wb}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ProfileDataCard 
                  dataTitle="300's" 
                  data={three}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ProfileDataCard 
                  dataTitle="Broad Jump" 
                  data={broad}
                />
              </Grid>

              {/* ROW 2 */}
              <Grid item xs={12} sm={6} md={4}>
                <ProfileDataCard 
                  dataTitle="Vertical Jump" 
                  data={vertical}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ProfileDataCard 
                  dataTitle="5-10-5" 
                  data={agility}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ProfileDataCard 
                  dataTitle="40yd Dash" 
                  data={forty}
                />
              </Grid>
            </>)}

            {/* HIGH SCHOOL STUDENTS UPLOAD LINKS */}
            {this.props.currentUser.team === 'highschool' 
            ? <Grid container direction='row' alignItems='flex-start' sx={{m: '20px 35px'}}>
                <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} item xs={12}>
                <Title>Upload Links</Title>
                <Typography variant="caption" gutterBottom sx={{textAlign: 'left', marginTop: '-10px'}}>
                  You can submit a new link for each category every 90 days.
                </Typography>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
                  <ProfileLink dataTitle="Wall Ball Link" data={wbLink} />
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
                  <ProfileLink dataTitle="300's Link" data={threeLink} />
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
                  <ProfileLink dataTitle="Broad Jump Link" data={broadLink} />
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
                  <ProfileLink dataTitle="Vertical Jump Link" data={verticalLink} />
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
                  <ProfileLink dataTitle="5-10-5 Link" data={agilityLink} />
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
                  <ProfileLink dataTitle="40yd Dash Link" data={fortyLink} />
                </Grid>
              </Grid>
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