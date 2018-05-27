import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VideosContainer from './VideosContainer.js';
import Home from './Home';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';
import LogOut from './LogOut';

class App extends Component {
  render() {
    return (
      <div className="App bg-dark">
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
    <div>
      <Navbar />
      <Route exact path="/" component={Home}/>
      <Route path="/videos" component={VideosContainer}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/login" component={LogIn}/>
      <Route path="/logout" component={LogOut}/>
    </div>
  </Router>
)

export default Main;
