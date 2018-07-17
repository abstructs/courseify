import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Redirect } from 'react-router';

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        localStorage.removeItem('token');
        // console.log(this.state)
        // axios.get(`${process.env.REACT_APP_API_URL}/api/v1/videos.json`)
        // .then(response => {
        //     console.log(response)
        //     this.setState({videos: response.data})
        // }).catch(error => console.log(error));
    }
    render() {
        return <Redirect to={'/'} />;
    }
}

export default Logout;