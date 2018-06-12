import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Auth from './Auth';
import RecommendationContainer from './Recommendation';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isLoggedIn = Auth().isAuthenticated();
        const profileLink = isLoggedIn ? <li className="nav-item"><a className="nav-link" href="/profile">Profile</a></li> : <div></div>;
        const videoLink = isLoggedIn  ? <li className="nav-item"><a className="nav-link" href="/videos">Videos</a></li> : <div></div>;
        const rightNav = !isLoggedIn ?   <ul className="navbar-nav ml-auto mr-5">
                                            <li className="nav-item">
                                                <a className="nav-link" href="/signup">Sign Up</a>
                                            </li>
                                            
                                            <li className="nav-item">
                                                <a className="nav-link" href="/login">Log In</a>
                                            </li>
                                        </ul>
                                    :   <ul className="navbar-nav  ml-auto mr-5">
                                            <li className="nav-item mr-5">
                                                <RecommendationContainer />
                                                {/* <button className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} href="/recommend">Recommend Something</button> */}
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/logout">Log Out</a>
                                            </li>
                                        </ul>;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand ml-5" href="/">Courseify</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        {profileLink}
                        {videoLink}
                        
                    </ul>
                    {rightNav}
                </div>
            </nav>
        );
    }
}

export default Navbar;