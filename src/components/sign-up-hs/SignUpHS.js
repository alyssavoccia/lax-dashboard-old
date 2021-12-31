import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

import 'firebase/compat/auth';
import { auth, createUserProfileDocument } from '../../firebase/firebase';

class SignUpHS extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      team: 'highschool',
      position: '',
      grad: '',
      open: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {displayName, email, password, confirmPassword, team, grad, position} = this.state;

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, displayName, team, grad, position);

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        team: ''
      });

      this.handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = event => {
    const {name, value} = event.target;

    this.setState({[name]: value});
  }

  render() {
    const {displayName, email, password, confirmPassword, team, grad, position, open} = this.state;
    const gradYears = [
      {
        value: '2023',
        label: '2023'
      },
      {
        value: '2024',
        label: '2024'
      },
      {
        value: '2025',
        label: '2025'
      },
      {
        value: '2026',
        label: '2026'
      }
    ];
    const positions = [
      {
        value: 'A',
        label: 'A'
      },
      {
        value: 'M',
        label: 'M'
      },
      {
        value: 'D',
        label: 'D'
      }
    ]

    return (
      <div>
        <Button variant="outlined" onClick={this.handleOpen}>
          High School Sign Up
        </Button>
        <Dialog open={open} onClose={this.handleClose} height='100%'>
          <DialogTitle>High School Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To sign up, please fill out the required information below.
            </DialogContentText>
            <TextField
              inputProps={{
                form: {
                  autocomplete: 'off'
                }
              }}
              required
              autoFocus
              margin="dense"
              label="Full Name"
              name="displayName"
              fullWidth
              variant="standard"
              onChange={this.handleChange}
              value={displayName}
            />
            <TextField
              inputProps={{
                form: {
                  autocomplete: 'off'
                }
              }}
              required
              margin="dense"
              label="Email Address"
              type="email"
              name='email'
              fullWidth
              variant="standard"
              onChange={this.handleChange}
              value={email}
            />
            <TextField
              inputProps={{
                form: {
                  autocomplete: 'off'
                }
              }}
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={this.handleChange}
              value={password}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="standard"
              onChange={this.handleChange}
              value={confirmPassword}
            />
            <TextField
              margin="dense"
              disabled
              fullWidth
              label="Team Code"
              name="team"
              value={team}
              variant="standard"
              onChange={this.handleChange}
            />
            <TextField
              required
              select
              fullWidth
              label="Grad Year"
              name="grad"
              value={grad}
              onChange={this.handleChange}
              helperText="Please select your grad year"
              variant="standard"
            >
              {gradYears.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              select
              fullWidth
              label="Position"
              name="position"
              value={position}
              onChange={this.handleChange}
              helperText="Please select your position"
              variant="standard"
            >
              {positions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <DialogContentText sx={{mt: 2, fontSize: 20,}} color="primary">
              Total: $1
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button variant="contained" onClick={this.handleSubmit}>Sign Up</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SignUpHS;