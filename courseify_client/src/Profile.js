import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Auth from './Auth';
import { Redirect } from 'react-router';

class Profile extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const isLoggedIn = Auth().isAuthenticated();
        
        if(!isLoggedIn) {
            return <Redirect to='/'/>;
        }

        return (
            <div className="bg-light">
            <br/>
            <h1 className="text-dark text-center">Profile</h1>
            <br/>
            <div>
                <p>Username</p>
            </div>

            </div>
        );
    }
}

export default Profile;