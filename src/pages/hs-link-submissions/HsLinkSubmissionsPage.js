import * as React from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Title from '../../components/title/Title';

import HsSubmissionsPageCard from '../../components/hs-submissions-page-card/HsSubmissionsPageCard';

import { firestore } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

class HsLinkSubmissionsPage extends React.Component {
  state = {}

  componentDidMount() {
    let self = this;
    let users = [];
    let usersData = [];

    if (self.props.currentUser.isAdmin) {
      async function getTeam() {
        const snapshot = await firestore.collection(self.props.currentUser.team).get();
        snapshot.docs.map(doc => {
          if (!doc.data().isAdmin) {
            users.push(doc.data());
          }
        });
        if (users.length > 0) {
          getUserData();
        }
      }
      getTeam();
    }

    async function getUserData() {
      for (const person of users) {
        const docRef = doc(firestore, self.props.currentUser.team, person.id, "links", person.id);
        const docSnap = await getDoc(docRef);
        const userDataObj = docSnap.data();
        usersData.push({...person, ...userDataObj});
      }

      self.setState(prevState => {
        return {
          ...prevState,
          usersData
        }
      })
    }
  }

  handleDelete = (e) => {
    const linkId = e.target.parentNode.parentNode.id;
    const dataState = this.state.usersData[0];
    const playerId = e.target.parentNode.parentNode.parentNode.parentNode.id;

    // Create updated value object
    const updatedValue = {
      [linkId]: null
    }

    // Update on firebase
    const docRef = doc(firestore, "highschool", playerId, "links", playerId);
    updateDoc(docRef, {[linkId]: null});

    // Update State - will remove item from page
    const updatedState = [{...dataState, ...updatedValue}]
    
    this.setState({
      usersData: updatedState
    });
  }

  
  render() {
    let usersDataArr = this.state.usersData;
    const userSubmissions = [];

    if (usersDataArr) {
      usersDataArr.map((player, i) => {
        if (player.wbLink || player.threeLink || player.verticalLink || player.agilityLink || player.broadLink || player.fortyLink) {
          userSubmissions.push(player);
        }
      });
    }

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
          <Title>Pending Submissions</Title>
          <Grid container spacing={3}>
            {userSubmissions.length > 0  
              ? userSubmissions.map((player, i) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={i}> 
                    <HsSubmissionsPageCard
                      name={player.displayName}
                      playerId={player.id}
                      wbLink={player.wbLink}
                      threeLink={player.threeLink}
                      agilityLink={player.agilityLink}
                      broadLink={player.broadLink}
                      verticalLink={player.verticalLink}
                      fortyLink={player.fortyLink}
                      handleDelete={this.handleDelete}
                    />
                  </Grid>
                )
              })
            : ''}
          </Grid>
        </Container>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(HsLinkSubmissionsPage);