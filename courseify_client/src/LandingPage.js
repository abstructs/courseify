import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import VideosContainer from './VideosContainer.js';
import Navbar from './Navbar.js';
import Auth from './Auth';
import teacherImage from './images/laptop.jpeg';

class LandingPage extends Component {
  render() {
    return (
      <div className="home bg-white">

        <div className="bg-dark border-0 pt-5 pb-5" style={{backgroundImage: "url(" + teacherImage +")", backgroundPosition: "250px 660px"}}>
          <div className="container">
            <h2 className="text-light font-weight-light">Welcome to courseify.</h2><br/>
            <h4 className="text-light font-weight-light">
              We’re all about finding you right resources,<br/><br/>
              recommended to you by the<br/><br/>
              <b>people you know.</b><br/>
            </h4>
            <br/>
            <a href="#reasons" className="btn pr-5 pl-5 text-white" style={{backgroundColor: "#ff6000"}}>Learn More</a>
          </div>
        </div>

        <section id="reasons" className="bg-light pt-5 pb-5">
          {/* <hr/> */}
          <h1 className="text-center mb-5 text-dark">Three Reasons To Try Courseify</h1>
          <hr/>

          <div className="row mt-5 h-5">
            
            <div className="col-md-3 offset-1">
              {/* <img className="card-img-top img-fluid" src={teacherImage} alt="Card image cap"/> */}
              <div className="card border border-light bg-light" style={{minHeight: "175px"}}>
                <div className="card-body">
                  <h5 className="card-title">The Best Resources</h5>
                  <p className="card-text">Courseify is a platform where the people you know can store their recommendations, so you know who to trust.</p>
                  {/* <a className="btn pr-5 pl-5 text-white" style={{backgroundColor: "#ff6000"}}>Go Somewhere</a> */}
                </div>
              </div>            
            </div>

            <div className="col-md-4">
              <div className="card border border-light bg-light" style={{minHeight: "175px"}}>
                <div className="card-body">
                  <h5 className="card-title">Your People</h5>
                  <p className="card-text">We're empowered by the people who empower you. We know how hard it is to cut through bullshitters and get to the content that can really make a difference.</p>
                  {/* <a className="btn pr-5 pl-5 text-white" style={{backgroundColor: "#ff6000"}}>About</a> */}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border border-light bg-light" style={{minHeight: "175px"}}>
                <div className="card-body">
                  <h5 className="card-title">Discuss What Matters</h5>
                  <p className="card-text">Feel free to message whoever made a recommendation, we believe it's important to being able to discuss with the people you're getting advice from.</p>
                  {/* <a className="btn pr-5 pl-5 text-white" style={{backgroundColor: "#ff6000"}}>About</a> */}
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-5 mb-5">
            <a className="btn text-white pl-5 pr-5 ml-auto mr-auto" style={{backgroundColor: "#ff6000"}} href="/signup">Get Started</a>
          </div>
          <hr/>
        </section>
      </div>
    );
  }
}

export default LandingPage;
