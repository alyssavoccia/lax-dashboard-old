import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase';
import { connect } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Navbar from './components/navbar/Navbar';
import SignIn from './pages/sign-in/SignIn';
import DashboardPage from './pages/dashboard/DashboardPage';
import WorkoutsPage from './pages/workouts/Workouts';
import ProfilePage from './pages/profile/ProfilePage';
import PlayerDataPage from './pages/player-data/PlayerData';

import { setCurrentUser } from './redux/user/user.actions';

import './App.css';

const mdTheme = createTheme();

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          });
      } else {
        setCurrentUser(userAuth)
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={mdTheme}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Switch>
              <Route exact path = '/' component={SignIn} />
              <Route path='/dashboard' component={DashboardPage} />
              <Route path='/workouts' component={WorkoutsPage} />
              <Route path='/profile' component={ProfilePage} />
              <Route path='/player-data' component={PlayerDataPage} />
            </Switch>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);