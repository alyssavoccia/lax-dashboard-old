import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



import 'firebase/compat/auth';
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase';
import SignUpHS from '../sign-up-hs/SignUpHS';



class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      team: '',
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {displayName, email, password, confirmPassword, team} = this.state;

    if (password !== confirmPassword) {
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Passwords <strong>do not</strong> match.
      </Alert>
      return;
    }

    const teamRef = firestore.collection(team);
    const teamSnapshot = await teamRef.get();

    if (teamSnapshot.size === 0) {
      Alert('Team does not exist');
      return;
    }

    // if (password.length < 6) {
    //   <Alert severity="error">
    //     <AlertTitle>Error</AlertTitle>
    //     Password must be<strong>at least</strong> 6 characters long.
    //   </Alert>
    // }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, displayName, team);

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        team: ''
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = event => {
    const {name, value} = event.target;

    this.setState({[name]: value});
  }

  render() {
    const {displayName, email, password, confirmPassword, team} = this.state;
    return (
      <Grid item xs={12} md={6}>
        <Avatar sx={{ m: '15px auto', bgcolor: 'secondary.main' }}>
          <PersonOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            inputProps={{
              form: {
                autocomplete: 'off'
              }
            }}
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="displayName"
            onChange={this.handleChange}
            value={displayName}
          />
          <TextField
            inputProps={{
              form: {
                autocomplete: 'off'
              }
            }}
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            onChange={this.handleChange}
            type="email"
            value={email}
          />
          <TextField
            inputProps={{
              form: {
                autocomplete: 'off'
              }
            }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={this.handleChange}
            value={password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            onChange={this.handleChange}
            value={confirmPassword}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Team Code"
            name="team"
            value={team}
            onChange={this.handleChange}
          />
          <Box display='flex' justifyContent='space-between'>
            <Button
              onClick={this.handleSubmit}
              type="submit"
              sx={{pl: 15, pr: 15, mb: 1}}
              variant="contained"
            >
              Sign Up
            </Button>
            <SignUpHS />
          </Box>
          <Typography variant='h5' color='red'>
            Test Payments for HS Sign Up
          </Typography>
          <Typography variant='h6' color='red'>
            4242 4242 4242 4242
            Exp: 12/22  CVV: 123 ZIP: 12345
          </Typography>
        </Box>
      </Grid>
    );
  }
}

export default SignUp;