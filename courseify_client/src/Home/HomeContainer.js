import React, { Component } from 'react';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import VideosContainer from './VideosContainer.js';
import Auth from '../Auth';
// import teacherImage from '../images/laptop.jpeg';
import HomeLandingPage from './HomeLandingPage';
import HomePage from './HomePage';
import PropTypes from 'prop-types';
// import axios from 'axios';

class HomeContainer extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   recommendations: [],
    //   users: []
    // }
  }

  componentDidMount() {
    // axios.get('http://
  }

  render() {
    const isLoggedIn = Auth().isAuthenticated();

    // .then(res => {
    //   const recommendations = res.data.recommendations;

    //   axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users`)
    //   .then(res => {
    //     const users = res.data.users;

    //     this.setState({ recommendations, users });
    //   })
      
    // })dIn = Auth().isAuthenticated();

    // if(!this.state.users || !this.state.recommendations) {
    //   return <div>Loading</div>;
    // }

    return !isLoggedIn ? <HomeLandingPage /> : <HomePage />;
  }
}

export default HomeContainer;
