import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                <ul className="navbar-nav ml-auto mr-5">
                    <li className="nav-item">
                        <a className="nav-link" href="/signup">Sign Up</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Log In</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;