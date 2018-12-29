import * as React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Navbar from './Helpers/Navbar';
// import Footer from './Helpers/Footer';
// import ProfileContainer from './Profile/ProfileContainer';
import CourseComponent from './Course/CourseComponent';
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
import { UserService, ICurrentUser } from './Services/UserService';
import HomePage from './Home/containers/HomePage';
import ProfileComponent from './Profile/components/ProfileComponent';
import CourseShow from './Course/CourseShow';
// import Auth from './User/Auth';

// import RecommendationCreateModal from './Recommendation/RecommendationCreateModal';

const blueTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#ff5131',
      main: '#d50000',
      dark: '#9b0000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#fd558f',
      main: '#c51162',
      dark: '#8e0038',
      contrastText: '#ffffff'
    },
  },
});

const userService: UserService = new UserService();

const getCurrentUser: () => ICurrentUser | null = () => userService.getCurrentUser();

const App = () => (
  <Router>
    <MuiThemeProvider theme={blueTheme}>
      <Navbar isAuthenticated={() => getCurrentUser() != null} />
      <Route exact path="/" component={HomePage}/>
      {/* <Route path="/recommend" component={RecommendationContainer}/>
     */}
      {/* <Route exact path="/profile" component={ProfileContainer}/> */}

      <Route exact path="/courses" component={(props: any) => <CourseComponent getCurrentUser={() => getCurrentUser()} {...props} />} />

      <Route path="/courses/:id" component={(props: any) => <CourseShow getCurrentUser={() => getCurrentUser()} {...props} />} />

      {/* <Route strict exact path="/profile/recommendations" component={RecommendationsContainer}/> */}
      <Route exact path="/profile" component={(props: any) => <ProfileComponent getCurrentUser={() => getCurrentUser()} {...props} />} />
      <Route strict exact path="/profile/:username" component={(props: any) => <ProfileComponent getCurrentUser={() => getCurrentUser()} {...props} />} />
      {/* <Route strict exact path="/people/:username/recommendations" component={RecommendationsContainer}/> */}

      <Route path="/signup" component={SignUp}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
      {/* <Footer /> */}
    </MuiThemeProvider>
  </Router>
)

export default App;
