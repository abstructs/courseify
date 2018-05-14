import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import VideosContainer from './VideosContainer.js';
import Navbar from './Navbar.js';

class Home extends Component {
  render() {
    return (
      <div className="App bg-dark">
        {/* <Navbar /> */}
        {/* <header className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <h1 className="App-title">Welcome to React</h1> */}
        {/* </header> */}
        <h1 className="text-center text-light">Home</h1>
      </div>
    );
  }
}

export default Home;
