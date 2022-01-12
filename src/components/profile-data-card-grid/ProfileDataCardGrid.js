import React from 'react';
import { connect } from 'react-redux';

import Grid from '@mui/material/Grid';

import { firestore } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

import ProfileDataCard from '../../components/profile-data-card/ProfileDataCard';

class ProfileDataCardGrid extends React.Component {
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
    const { agility, broad, three, wb} = this.state;

    return (
      <>
        {/* ROW 1 */}
        <Grid item xs={12} sm={6}>
          <ProfileDataCard 
            dataTitle="50's Wall Ball" 
            data={wb}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileDataCard 
            dataTitle="300's" 
            data={three}
          />
        </Grid>

        {/* ROW 2 */}
        <Grid item xs={12} sm={6}>
          <ProfileDataCard 
            dataTitle="5-10-5" 
            data={agility}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileDataCard 
            dataTitle="Broad Jump" 
            data={broad}
          />
        </Grid>
      </>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(ProfileDataCardGrid);