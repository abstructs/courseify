import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VideosContainer from './VideosContainer.js';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import ProfileContainer from './Profile/ProfileContainer';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';
import LogOut from './LogOut';
import { createMuiTheme, withTheme, MuiThemeProvider } from '@material-ui/core';
// import RecommendationCreateModal from './Recommendation/RecommendationCreateModal';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5472d3',
      main: '#0d47a1',
      dark: '#002171',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#ffffff'
    },
  },
});

class App extends Component {
  render() {
    return (
      <div className="App bg-light">
        <Navbar />
        {/* <header className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <h1 className="App-title">Welcome to React</h1> */}
        {/* </header> */}
        <VideosContainer />
      </div>
    );
  }
}



// const requireAuth = () => {
//   if(!localStorage.getItem('token')) {
//     <Redirect to={'/login'}/>
//   }
// }

const Main = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <Route exact path="/" component={Home}/>
      <Route path="/videos" component={VideosContainer}/>
      {/* <Route path="/recommend" component={RecommendationContainer}/> */}
      <Route path="/profile" component={ProfileContainer}/>
      <Route path="/people" component={ProfileContainer}>
        <Route path="/:username" component={ProfileContainer} />
      </Route>
      <Route path="/signup" component={SignUp}/>
      <Route path="/login" component={LogIn}/>
      <Route path="/logout" component={LogOut}/>
      <Footer />
      </MuiThemeProvider>
  </Router>
)

export default Main;
