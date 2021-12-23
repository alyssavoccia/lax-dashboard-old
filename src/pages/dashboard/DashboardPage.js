import * as React from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import DashboardPlayerSearch from '../../components/dashboard-search/DashboardPlayerSearch';
import Title from '../../components/title/Title'
import DashboardGrid from '../../components/dashboard-grid/DashboardGrid';


// function handlePlayerChange(e, value) {
//   return value;
// }

class DashboardPage extends React.Component {
  state = {};

  handlePlayerChange = (e, value) => {
    this.setState({
      chosenPlayer: value
    })
  }

  render() {

    return (
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />

        { this.props.currentUser && this.props.currentUser.isAdmin 
          ? <Container maxWidth="lg" sx={{mt: 4, mb: 2}}>
              <DashboardPlayerSearch onChange={this.handlePlayerChange} />
            </Container>
          : <></>
        }

       
        {/* DASHBOARD GRID ITEMS */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        { this.props.currentUser && !this.props.currentUser.isAdmin 
          ? <DashboardGrid data={this.props.currentUser} />
          : this.state.chosenPlayer === undefined || this.state.chosenPlayer === '' || this.state.chosenPlayer == null
          ? <Title>Please choose a player to view their dashboard.</Title>
          : <DashboardGrid />
        }
        </Container>
      </Box>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(DashboardPage);