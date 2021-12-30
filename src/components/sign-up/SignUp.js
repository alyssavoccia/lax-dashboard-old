import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Typography from '@mui/material/Typography';

import 'firebase/compat/auth';
import { auth, createUserProfileDocument } from '../../firebase/firebase';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      team: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {displayName, email, password, confirmPassword, team} = this.state;

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

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
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="displayName"
            onChange={this.handleChange}
            value={displayName}
          />
          <TextField
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
          <Button
            onClick={this.handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Grid>
    );
  }
}

export default SignUp;