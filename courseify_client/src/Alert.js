import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import VideosContainer from './VideosContainer.js';
// import Navbar from './Navbar.js';
// import Auth from './Auth';
// import teacherImage from './images/laptop.jpeg';
// import LandingPage from './LandingPage';
// import axios from 'axios';

class Alert extends React.Component {

    constructor(props) {
        super(props);
    }

    alertClass(type) {
        let classes = {
            danger: 'alert-danger',
            warning: 'alert-warning',
            info: 'alert-info',
            success: 'alert-success'
        };

        return classes[type] || classes.success;
    }

    render() {
        const message = this.props.message;
        const alertClassName = `alert ${ this.alertClass(message.type) }`;

        return(
            <div className={ alertClassName + " pt-3 pb-1 m-0 border border-0" } role="alert">
                <button className='close'
                data-dismiss='alert'> &times; </button>
                <p className="text-dark">{ message.text }</p>
            </div>
        );
    }
}

export default Alert;
