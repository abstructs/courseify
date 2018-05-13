import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideosContainer from './VideosContainer.js';
import Navbar from './Navbar.js';

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

export default App;
