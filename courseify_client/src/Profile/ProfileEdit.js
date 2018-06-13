import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import Profile from './ProfileContainer';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
// import $ from 'jquery';
// import swal from 'sweetalert';

{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

// TODO: Change ProfileEdit to handle it's own state
class ProfileEdit extends Component {
    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <div className="">
                <form>
                    <div className="form-row mb-4">
                        <div className="col-md-4">
                            <label for="first_name">First name</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.first_name} type="text" className="form-control" name="first_name" placeholder="First Name" required />
                        </div>
                            
                        <div className="col-md-4">
                            <label for="last_name">Last Name</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.last_name} type="text" className="form-control" name="last_name" placeholder="Last Name" required />
                        </div>

                        <div className="col-md-4">
                            <label for="headline">Headline</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.headline} type="text" className="form-control" name="headline" placeholder="Job Title" required />
                        </div> 
                    </div>

                    <div className="form-row mb-4">
                        <div className="col-md-6">
                            <label for="country">Country</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.country} type="text" className="form-control" name="country" placeholder="Country" required />
                        </div>
                                
                        <div className="col-md-6">
                            <label for="education">Education</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.education} type="text" className="form-control" name="education" placeholder="Education" required />
                        </div>
                    </div>

                    <div className="form-row mb-4">
                        <div className="col-md-12">
                            <label for="industry">Industry</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.industry} type="text" className="form-control" name="industry" placeholder="Industry" required />
                        </div>
                    </div>

                    <div className="form-row mb-4">
                        <div className="col-md-12">
                            <label for="summary">Summary</label>
                            <textarea onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.summary} className="form-control" name="summary" placeholder="Summary" required />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ProfileEdit;