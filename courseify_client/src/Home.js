import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import VideosContainer from './VideosContainer.js';
import Navbar from './Navbar.js';
import Auth from './Auth';
import teacherImage from './images/teacher.jpeg';
import LandingPage from './LandingPage';

class Home extends Component {
  render() {
    const isLoggedIn = !Auth().isAuthenticated();
    return isLoggedIn ? <LandingPage /> : 
    (
      <div>Hello World</div>
    )
  }
}

export default Home;
