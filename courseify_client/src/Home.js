import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import VideosContainer from './VideosContainer.js';
import Navbar from './Navbar.js';
import Auth from './Auth';

class Home extends Component {
  render() {
    const isLoggedIn = !Auth().isAuthenticated();
    const content = isLoggedIn ? <div>
                                  <p className="lead">Ready to get started?</p>
                                  <hr className="my-4"/>
                                  <p></p>
                                  <a className="btn btn-primary btn-lg" href="/signup" role="button">Sign Up</a>
                                </div>
                              : 
                              <div>
                                  <p className="lead">Let's get started with a course, how about it?</p>
                                  <hr className="my-4"/>
                                  <p></p>
                                  <a className="btn btn-primary btn-lg" href="/videos" role="button">Get Started</a>
                              </div>;
    return (
      <div className="App bg-light">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to courseify.</h1>
          {content}
        </div>
      </div>
    );
  }
}

export default Home;
