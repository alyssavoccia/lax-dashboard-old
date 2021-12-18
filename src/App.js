import React from 'react';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SignIn from './pages/sign-in/SignIn';
import Dashboard from './pages/dashboard/Dashboard';
import WorkoutsPage from './pages/workouts/Workouts';
import ProfilePage from './pages/profile/ProfilePage';
import PlayerDataPage from './pages/player-data/PlayerData';

import { auth, createUserProfileDocument, firestore } from './firebase/firebase';

const mdTheme = createTheme();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            },
            currentTeam: {
              team: snapShot.data().team,
            }
          }, () => {
            console.log(this.state);
          })
        });
      } else {
        this.setState({currentUser: userAuth})
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
              <Route path='/dashboard' component={Dashboard} />
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

export default App;