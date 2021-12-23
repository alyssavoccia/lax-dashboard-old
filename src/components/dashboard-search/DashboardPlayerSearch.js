import * as React from 'react';
import { connect } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { firestore } from '../../firebase/firebase';

function DashboardPlayerSearch({ onChange, currentUser }) {
  
  if (currentUser.isAdmin) {
    async function getTeam() {
      const snapshot = await firestore.collection(currentUser.team).get();
      snapshot.docs.map(doc => doc.data().isAdmin ? '' : players.push(doc.data().displayName));
    }
    getTeam();
  }
  
  const players = [];

  return (
    <Autocomplete
      onChange={onChange}
      disablePortal
      id="dashboard-player-search"
      options={players}
      sx={{ width: 300, backgroundColor: '#FFF' }}
      renderInput={(params) => <TextField {...params} label="Player" />}
    />
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(DashboardPlayerSearch);