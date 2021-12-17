import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import WorkoutsPage from './pages/workouts/Workouts';
import ProfilePage from './pages/profile/ProfilePage';
import PlayerDataPage from './pages/player-data/PlayerData';

const mdTheme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/workouts' component={WorkoutsPage} />
            <Route path='/profile' component={ProfilePage} />
            <Route path='/player-data' component={PlayerDataPage} />
          </Switch>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;