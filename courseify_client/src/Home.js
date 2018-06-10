import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import VideosContainer from './VideosContainer.js';
import Navbar from './Navbar.js';
import Auth from './Auth';
import teacherImage from './images/laptop.jpeg';
import LandingPage from './LandingPage';
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recommendations: [],
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/recommendations')
    .then(res => {
      const recommendations = res.data.recommendations;

      axios.get('http://localhost:3000/api/v1/users')
      .then(res => {
        const users = res.data.users;

        this.setState({ recommendations, users });
      })
      
    })
  }

  render() {
    const isLoggedIn = Auth().isAuthenticated();

    if(!isLoggedIn) return <LandingPage />;

    if(!this.state.users || !this.state.recommendations) {
      return <div>Loading</div>;
    }

    return (

      <div className="home bg-white">
        <div className="bg-dark border-0 pt-5 pb-5" style={{backgroundImage: "url(" + teacherImage +")", backgroundPosition: "250px 660px"}}>
          <div className="container">
            <h2 className="text-light font-weight-light">Welcome back, Andrew</h2><br/>
            <h4 className="text-light font-weight-light">Ready to have your socks knocked off,<br/> with some new resources?</h4>
            <br/>
            <a href="#courses" className="btn pr-5 pl-5 text-white" style={{backgroundColor: "#ff6000"}}>Let's Take A Look</a>
          </div>
        </div>

        <section id="reasons" className="bg-light pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 p-5">
              <h4 className="text-center font-weight-light"><b>Recommendations</b></h4>
              {this.state.recommendations.map(recommendation => {
                console.log(recommendation)
                return (
                  <div>
                    <p className="text-center"><a target="_blank" href={recommendation.url}>{recommendation.title} by {recommendation.author}.</a></p>
                  </div>
                );
              })}
            </div>
            <div className="col-xl-4 p-5">
              <h4 className="text-center font-weight-light"><b>New Users</b></h4>
              {this.state.users.map(user => {
                console.log(user)
                return (
                  <div>
                    <p className="text-center">Welcome {user.first_name + " " + user.last_name}!</p>
                  </div>
                );
              })}
            </div>
            <div className="col-xl-4 p-5">
              <h4 className="text-center font-weight-light"><b>Featured Courses</b></h4>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
