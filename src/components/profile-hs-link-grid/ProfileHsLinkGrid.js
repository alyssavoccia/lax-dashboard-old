import React from 'react';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import Grid from '@mui/material/Grid';
import Title from '../../components/title/Title';

import ProfileHsLink from '../../components/profile-hs-link/ProfileHsLink';

class ProfileHsLinkGrid extends React.Component {
  state = {};
  
  componentDidMount() {
    let self = this;

    // Get the current user's data if not an admin
    if (!this.props.currentUser.isAdmin) {
      // Get information for high school student link upload
      async function getUserLinks() {
        const linkDocRef = doc(firestore, self.props.currentUser.team, self.props.currentUser.id, "links", self.props.currentUser.id);
        const linkDocSnap = await getDoc(linkDocRef);
        const userLinkObj = linkDocSnap.data();

        self.setState({
          ...userLinkObj
        });
      }
      getUserLinks();
    }
  }

  handleSubmit = (e) => {
    // Get the input id to know which value is being updated in firebase
    const inputId = e.target.parentElement.parentElement.childNodes[0].childNodes[0].id;

    // Get the link that the user entered
    const inputValue = e.target.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].value;

    // Get the input element
    const input = e.target.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];

    // Create updated value object
    const updatedValue = {
      [inputId]: inputValue
    }

    // Update on firebase
    const docRef = doc(firestore, this.props.currentUser.team, this.props.currentUser.id, "links", this.props.currentUser.id);
    updateDoc(docRef, updatedValue);

    this.setState({
      ...updatedValue
    });

    // Reset input element value after submitting
    input.value = '';
  }

  render() {
    const { agilityLink, broadLink, threeLink, wbLink } = this.state;

    return (
      <Grid container direction='row' alignItems='flex-start' sx={{m: '20px 35px'}}>
        <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} item xs={12}>
        <Title>Upload Links</Title>
        </Grid>
        {wbLink === undefined 
        ? <></>
        :<>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="Wall Ball Link" data={wbLink} handleSubmit={this.handleSubmit} dataId="wbLink" />
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="300's Link" data={threeLink} handleSubmit={this.handleSubmit} dataId="threeLink" />
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="Broad Jump Link" data={broadLink} handleSubmit={this.handleSubmit} dataId="broadLink" />
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="5-10-5 Link" data={agilityLink} handleSubmit={this.handleSubmit} dataId="agilityLink" />
          </Grid>
        </>
  
        }
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(ProfileHsLinkGrid);