import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class VideosContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand ml-5" href="#">Courseify</a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active" href="#">
                        <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item" href="#">
                        <a className="nav-link" href="#">Videos</a>
                    </li>
                    <li className="nav-item" href="#">
                        <a className="nav-link" href="#">About</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto mr-5">
                    <li className="nav-item" href="#">
                        <a className="nav-link" href="#">Sign Up</a>
                    </li>
                    <li className="nav-item" href="#">
                        <a className="nav-link" href="#">Log In</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default VideosContainer;