import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import 'firebase/compat/auth';
import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(String(process.env.PUBLISHABLE_KEY));

const theme = createTheme();

const SignInSignUp = () => (
  <ThemeProvider theme={theme}>
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={5}>
          <SignIn />
          <Elements stripe={stripePromise}><SignUp /></Elements>
        </Grid>            
      </Box>
    </Container>
  </ThemeProvider>
);

export default SignInSignUp;