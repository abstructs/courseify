import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Auth from './Auth';

class Navbar extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        var rightNav = <div></div>;
        // !this.props.isLoggedIn()
        // !Auth.isAuthenticated
        if(!Auth().isAuthenticated()) {
            rightNav =    <ul className="navbar-nav ml-auto mr-5">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/signup">Sign Up</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Log In</a>
                                    </li>
                                </ul>;
        } else {
            rightNav =    <ul className="navbar-nav ml-auto mr-5">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/logout">Log Out</a>
                                    </li>
                                </ul>;
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand ml-5" href="/">Courseify</a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/videos">Videos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                </ul>
                {rightNav}
            </nav>
        );
    }
}

export default Navbar;