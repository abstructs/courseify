import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Auth from './Auth';
import { Redirect } from 'react-router';
import teacherImage from './images/laptop.jpeg';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            followed: false
        }
    }

    handleFollow(e) {
        this.setState({followed: !this.state.followed});
    }

    render() {
        const isLoggedIn = Auth().isAuthenticated();
        
        if(!isLoggedIn) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <header className="bg-dark border-0 pt-5" style={{marginBottom: "0px", height: "150px", backgroundImage: "url(" + teacherImage +")", backgroundPosition: "250px 660px"}}>
                    
                </header>
                <section>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="rounded-circle border border-white bg-dark ml-auto mr-auto p-auto text-center" style={{height: "150px", width: "150px", marginTop: "-70px"}}></div>   
                            <h2 className="text-dark text-center font-weight-light p-auto">Andrew Wilson</h2>
                            <div className="mb-2 mt-4 text-center">
                                <a href="#follow" className="btn text-white m-auto text-center" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleFollow.bind(this)}>{this.state.followed ? "Unfollow" : "Follow"}</a>
                            </div>
                            <div className="mb-2 text-center">
                                <a href="#message" className="btn btn-primary text-white m-auto text-center" style={{width: "250px"}}>Message</a>
                            </div>
                        </div>
                        <div className="col-lg-4 mt-4 mr-auto text-center">
                            {/* <h2 className="text-light font-weight-light p-auto">Andrew Wilson</h2> */}
                            <p className="d-inline pr-3"><b>0</b> recommendations</p>
                            <p className="d-inline pr-3"><b>0</b> followers</p>
                            <p className="d-inline pr-3"><b>0</b> following</p>

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Profile;