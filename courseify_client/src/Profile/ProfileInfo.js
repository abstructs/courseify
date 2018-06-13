import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
// import $ from 'jquery';
// import swal from 'sweetalert';

{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* <h2 className="text-light font-weight-light p-auto">Andrew Wilson</h2> */}
                {/* <div className="text-center "> */}
                    {/* <p className="d-inline pr-3"><b>0</b> recommendations</p>
                    <p className="d-inline pr-3"><b>0</b> followers</p>
                    <p className="d-inline pr-3"><b>0</b> following</p> */}
                {/* </div> */}
                {/* <br/>
                <br/> */}
                <p className=""><b><i>{this.props.user_info.headline}</i></b> in <b><i>{this.props.user_info.country}</i></b>.</p>
                <p>Involved in <b><i>{this.props.user_info.industry}</i></b>.</p>
                <p className="">Attended <b><i>{this.props.user_info.education}</i></b>.</p>
                <p className="" style={{whiteSpace: "pre-wrap"}}><i>{this.props.user_info.summary}</i></p>
            </div>
        );
    }
}

export default ProfileInfo;