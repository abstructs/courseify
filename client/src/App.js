import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomeContainer from './Home/HomeContainer';
import Navbar from './Navbar';
import Footer from './Footer';
import ProfileContainer from './Profile/ProfileContainer';
import CourseContainer from './Course/CourseContainer';
import RecommendationsContainer from './Recommendation/RecommendationsContainer';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';
import LogOut from './LogOut';
import { createMuiTheme, withTheme, MuiThemeProvider } from '@material-ui/core';
import Auth from './User/Auth';

// import RecommendationCreateModal from './Recommendation/RecommendationCreateModal';

const blueTheme = createMuiTheme({
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

const pinkTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#e35183',
      main: '#ad1457',
      dark: '#78002e',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#9a67ea',
      main: '#673ab7',
      dark: '#320b86',
      contrastText: '#ffffff'
    },
  },
});



const darkTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffc947',
      main: '#ff9800',
      dark: '#c66900',
      contrastText: '#000000'
    },
  },
});

// class App extends Component {
//   render() {
//     return (
//       <div className="App bg-light">
//         <Navbar />
//         {/* <header className="App-header"> */}
//           {/* <img src={logo} className="App-logo" alt="logo" /> */}
//           {/* <h1 className="App-title">Welcome to React</h1> */}
//         {/* </header> */}
//         <VideosContainer />
//       </div>
//     );
//   }
// }



// const requireAuth = () => {
//   if(!localStorage.getItem('token')) {
//     <Redirect to={'/login'}/>
//   }
// }

const isLoggedIn = Auth().isAuthenticated;

const Main = () => (
  <Router>
    <MuiThemeProvider theme={blueTheme}>
      <Navbar />
      <Route exact path="/" component={HomeContainer}/>
      {/* <Route path="/recommend" component={RecommendationContainer}/>
     */}
      <Route exact path="/profile" component={ProfileContainer}/>

      <Route exact path="/courses" component={CourseContainer} />

      <Route path="/courses/:id" component={CourseContainer} />

      <Route strict exact path="/people" component={ProfileContainer} />
      <Route strict exact path="/profile/recommendations" component={RecommendationsContainer}/>
      <Route strict exact path="/people/:username" component={ProfileContainer} />
      <Route strict exact path="/people/:username/recommendations" component={RecommendationsContainer}/>

      <Route path="/signup" component={SignUp}/>
      <Route path="/login" component={LogIn}/>
      <Route path="/logout" component={LogOut}/>
      <Footer />
    </MuiThemeProvider>
  </Router>
)

export default Main;
