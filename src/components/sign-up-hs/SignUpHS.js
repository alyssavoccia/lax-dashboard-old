import * as React from 'react';

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';

import {CardElement} from '@stripe/react-stripe-js';

import 'firebase/compat/auth';
import { auth, createUserProfileDocument, firestore } from '../../firebase/firebase';

let formRef = React.createRef();

const currentUsers = [];

firestore.collection('users').onSnapshot((snapshot) => {
  snapshot.docs.map((user) => currentUsers.push(user.data().email));
});

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
      activeStep: 0,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  // Handles the opening and closing of the high school sign up modal
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

  // What happens when the form is submitted
  handleSubmit = async event => {
    // event.preventDefault();

    const { displayName, email, password, team, position, grad } = this.state;

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

  // When a user upates form, the state updates
  handleChange = event => {
    const {name, value} = event.target;

    this.setState({[name]: value});
  }

  render() {
    const {displayName, email, password, confirmPassword, team, grad, position, open, activeStep} = this.state;

    const handleNext = () => {
      if (formRef.current.reportValidity() && formRef.current.reportValidity() !== null) {

        if (password !== confirmPassword) {
          alert('Password DO NOT match.');
          return;
        }
  
        if (password.length < 6) {
          alert('Password must be AT LEAST 6 characters long.');
          return;
        }

        if (currentUsers !== null && currentUsers.length > 0) {
          if (currentUsers.indexOf(email) >= 0) {
            alert('That email address has already been used, please use a different one.');
            return;
          } else {
            this.setState({
              activeStep: activeStep + 1
            });
          }
        }
      }
    }
  
    const handleBack = () => {
      this.setState({
        activeStep: activeStep - 1
      })
    };

    const steps = [
      "Player Information",
      "Payment Information"
    ];

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
    ];

    return (
      <div>
        <Button variant="outlined" onClick={this.handleOpen}>
          High School Sign Up
        </Button>
        <Dialog open={open} onClose={this.handleClose} height='100%'>
          <DialogTitle>High School Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{mb: 1}}>
              To sign up, please fill out the required information below.
            </DialogContentText>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === 0 ?
            <form ref={formRef}>
              <TextField
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
            </form>
            : 
              <Box sx={{mt: 2}}>
                <CardElement />
                <DialogContentText sx={{mt: 2, fontSize: 20,}} color="primary">
                  Total: $1
                </DialogContentText>
              </Box>
            }
            
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={(event) => event.target.innerHTML.indexOf('Next') === 0 ? handleNext() : this.handleSubmit()}>
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default SignUpHS;