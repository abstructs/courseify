import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
// import Auth from './Auth';

class Footer extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <footer className="bg-dark text-light pt-5 pb-5 mt-5" style={{minHeight: "200px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 offset-1">
                            <h4>Stay Connected</h4>
                            <p>Join our email list and get updates from the team!</p>
                            <p><i>Coming Soon</i></p>
                        </div>

                        <div className="col-md-3 offset-1">
                            <h4>Commited To Helping You Learn</h4>
                            <small>Courseify is proud to be participating in making resources on the web more open. We know how hard it is to find good and credible resources, 
                               especailly when you are about to dedicate months of your time working on it.</small>
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
                </div>
            </footer>
        );
    }
}

export default Footer;