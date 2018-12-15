/* tslint:disable */s

import React, { Component } from 'react';
import '../App.css';
import { Paper } from '@material-ui/core';
// import axios from 'axios';
// import Auth from './Auth';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer style={{marginTop: "100px", backgroundColor: "#222", height: "200px"}}>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-md-3 offset-1">
                            <h4>Stay Connected</h4>
                            <p>Join our email list and get updates from the team!</p>
                            <p><i>Coming Soon</i></p>
                        </div>

                        <div className="col-md-3 offset-1">
                            <h4>Commited To Helping You Learn</h4>
                            <small>Courseify is proud to be participating in making resources on the web more open. We know how hard it is to find good and credible resources, 
                                   so we aim to make it easy :).</small>
                        </div>

                        <div className="col-md-3 offset-1">
                            <h4>Navigate</h4>
                            <nav className="navbar pl-0">
                                <ul className="navbar-nav pl-0">
                                    <li className="nav-item"><a href="/signup">Home</a></li>
                                    <li className="nav-item"><a href="/signup">Signup</a></li>
                                    <li className="nav-item"><a href="/signup">Login</a></li>                                    
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div> */}
            </footer>
        );
    }
}

export default Footer;