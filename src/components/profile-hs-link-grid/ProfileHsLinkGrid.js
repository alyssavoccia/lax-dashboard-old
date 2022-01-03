import React from 'react';
import { connect } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Title from '../../components/title/Title';

import { firestore } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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

        // Checking to see if the user's link has expired
        for (const entry in userLinkObj) {
          if (entry.includes('Expires') && userLinkObj[entry]) {
            const today = new Date().getTime() / 1000;
            if ((userLinkObj[entry].seconds - today) / 86400 <= 0) {
              const link = entry.slice(0, -7);
              const updatedValue = {
                [link]: null,
                [entry]: null
              }
              // Update on firebase
              const docRef = doc(firestore, self.props.currentUser.team, self.props.currentUser.id, "links", self.props.currentUser.id);
              updateDoc(docRef, updatedValue);
            }
          }
        }
        self.setState({
          ...userLinkObj
        });
      }
      getUserLinks();
    }
  }

  handleSubmit = (e) => {
    // Get the input id to know which value is being updated in firebase
    const inputId = e.target.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].id;

    // Get the link that the user entered
    const inputValue = e.target.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].value;

    // Get the input element
    const input = e.target.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0];

    // Create date submission expires
    const expireDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    // Create updated value object
    const updatedValue = {
      [inputId]: inputValue,
      [inputId + 'Expires']: expireDate
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
    const { agilityLink, broadLink, fortyLink, threeLink, verticalLink, wbLink, wbLinkExpires, threeLinkExpires, broadLinkExpires, verticalLinkExpires, agilityLinkExpires, fortyLinkExpires } = this.state;

    // Calculating the time left before links expire
    const timeLeftHolder = {};

    if (this.state) {
      for (const entry in this.state) {
        if (entry.includes('Expires') && this.state[entry]) {
          // Creates "wbLeft", "threeLeft", ...etc variables
          const varLeft = entry.slice(0, -11) + 'Left';
          // Get the date and how many days are remaining
          const today = new Date().getTime() / 1000;
          const daysRemaining = Math.round((this.state[entry].seconds - today) / 86400);
          // If value comes out to 0, gets the number of hours and minutes remaining
          if (daysRemaining === 0) {
            const timeLeft = new Date(0, 0);
            timeLeft.setMinutes((this.state[entry].seconds - today) / 60);
            timeLeftHolder[varLeft] = timeLeft.toTimeString().slice(0, 5);
            // If more than 1 day remaining, returns days remaining
          } else {
            timeLeftHolder[varLeft] = daysRemaining;
          }
        }
      }
    }

    return (
      <Grid container direction='row' alignItems='flex-start' sx={{m: '20px 35px'}}>
        <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} item xs={12}>
        <Title>Upload Links</Title>
        <Typography variant="caption" gutterBottom sx={{textAlign: 'left', marginTop: '-10px'}}>
          You can submit a new link for each category every 90 days.
        </Typography>
        </Grid>
        {wbLinkExpires === undefined ?
        <></>
        :<>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="Wall Ball Link" data={wbLink} handleSubmit={this.handleSubmit} dataId="wbLink" expires={wbLinkExpires ? timeLeftHolder.wbLeft : undefined} handleExpires={this.handleExpires} />
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="300's Link" data={threeLink} handleSubmit={this.handleSubmit} dataId="threeLink" expires={threeLinkExpires ? timeLeftHolder.threeLeft : undefined} />
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="Broad Jump Link" data={broadLink} handleSubmit={this.handleSubmit} dataId="broadLink" expires={broadLinkExpires ? timeLeftHolder.broadLeft : undefined} />
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="Vertical Jump Link" data={verticalLink} handleSubmit={this.handleSubmit} dataId="verticalLink" expires={verticalLinkExpires ? timeLeftHolder.verticalLeft : undefined} />
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="5-10-5 Link" data={agilityLink} handleSubmit={this.handleSubmit} dataId="agilityLink" expires={agilityLinkExpires ? timeLeftHolder.agilityLeft : undefined} />
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
            <ProfileHsLink dataTitle="40yd Dash Link" data={fortyLink} handleSubmit={this.handleSubmit} dataId="fortyLink" expires={fortyLinkExpires ? timeLeftHolder.fortyLeft : undefined} />
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