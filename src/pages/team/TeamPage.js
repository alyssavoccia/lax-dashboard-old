import * as React from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Title from '../../components/title/Title';

import TeamPageCard from '../../components/team-page-card/TeamPageCard';

import { firestore } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

class TeamPage extends React.Component {
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
        const docRef = doc(firestore, self.props.currentUser.team, person.id, "data", person.id);
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

  
  render() {
    let usersDataArr = this.state.usersData;
    const capitalTeam = this.props.currentUser.team[0].toUpperCase() + this.props.currentUser.team.slice(1);

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
          <Title>{capitalTeam} Roster</Title>
          <Grid container spacing={3}>
            {usersDataArr !== undefined  
              ? usersDataArr.map((player, i) => {
                if (!player.isAdmin) {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={i}> 
                      <TeamPageCard
                        key={player.id}
                        name={player.displayName}
                        position={player.position}
                        grad={player.grad}
                        agility={player.agility}
                        broad={player.broad}
                        three={player.three}
                        wb={player.wb}
                      /> 
                    </Grid>
                  )
                }
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

export default connect(mapStateToProps)(TeamPage);