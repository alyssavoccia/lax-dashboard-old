import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase';
import { connect } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Navbar from './components/navbar/Navbar';
import SignInSignUp from './pages/sign-in-and-sign-up/SignInSignUp';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/profile/ProfilePage';
import TeamPage from './pages/team/TeamPage';
import PlayerDataPage from './pages/player-data/PlayerDataPage';
import HsLinkSubmissionsPage from './pages/hs-link-submissions/HsLinkSubmissionsPage';

import { setCurrentUser } from './redux/user/user.actions';

import './App.css';

const theme = createTheme();

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        if (userRef) {
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          });
        }
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            {this.props.currentUser ? (<Navbar />) : (<Redirect to='/' />)}
            <Switch>
              <Route exact path = '/' render={() => this.props.currentUser ? (<Redirect to='/dashboard' />) : (<SignInSignUp />)} />
              <Route path='/dashboard' component={DashboardPage} />
              <Route path='/profile' component={ProfilePage} />
              <Route path='/team' component={TeamPage} />
              <Route path='/player-data' component={PlayerDataPage} />
              <Route path='/hs-link-submissions' component={HsLinkSubmissionsPage} />
            </Switch>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);