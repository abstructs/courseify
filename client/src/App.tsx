import * as React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Navbar from './Helpers/Navbar';
// import Footer from './Helpers/Footer';
// import ProfileContainer from './Profile/ProfileContainer';
// import CourseContainer from './Course/CourseContainer';
// import RecommendationsContainer from './Recommendation/RecommendationsContainer';
import {
  BrowserRouter as Router,
  Route,
  // Link,
  // Redirect
} from 'react-router-dom';
// import * as ReactRouter from 'react-router';

import SignUp from './User/SignUp';
import Login from './User/Login';
import Logout from './User/Logout';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
// import LandingPage from './Home/containers/LandingPage';
import { UserService } from './Services/UserService';
import HomePage from './Home/containers/HomePage';
// import Auth from './User/Auth';

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

// const pinkTheme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#e35183',
//       main: '#ad1457',
//       dark: '#78002e',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       light: '#9a67ea',
//       main: '#673ab7',
//       dark: '#320b86',
//       contrastText: '#ffffff'
//     },
//   },
// });

// const darkTheme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#4f5b62',
//       main: '#263238',
//       dark: '#000a12',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       light: '#ffc947',
//       main: '#ff9800',
//       dark: '#c66900',
//       contrastText: '#000000'
//     },
//   },
// });

// const requireAuth = () => {
//   if(!localStorage.getItem('token')) {
//     <Redirect to={'/login'}/>
//   }
// }

const userService: UserService = new UserService();

const isAuthenticated: () => boolean = () => userService.isAuthenticated();

const App = () => (
  <Router>
    <MuiThemeProvider theme={blueTheme}>
      <Navbar isAuthenticated={isAuthenticated} />
      <Route exact path="/" component={HomePage}/>
      {/* <Route path="/recommend" component={RecommendationContainer}/>
     */}
      {/* <Route exact path="/profile" component={ProfileContainer}/> */}

      {/* <Route exact path="/courses" component={CourseContainer} /> */}

      {/* <Route path="/courses/:id" component={CourseContainer} /> */}

      {/* <Route strict exact path="/people" component={ProfileContainer} /> */}
      {/* <Route strict exact path="/profile/recommendations" component={RecommendationsContainer}/> */}
      {/* <Route strict exact path="/people/:username" component={ProfileContainer} /> */}
      {/* <Route strict exact path="/people/:username/recommendations" component={RecommendationsContainer}/> */}

      <Route path="/signup" component={SignUp}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
      {/* <Footer /> */}
    </MuiThemeProvider>
  </Router>
)

export default App;
