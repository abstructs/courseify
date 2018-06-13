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

class ProfileFollowing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            following: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3000/api/v1/users/${this.props.profile_info.id}/following/`)
        .then(res => {
            const following = res.data.following;
            console.log(following)

            this.setState({ following });
        })
    }

    render() {
        return (
            <div>
                {this.state.following.map(follow => {
                    return <div><a href={`/people/${follow.id}`}>{follow.email}</a></div>;
                })}
            </div>
        );
    }
}

export default ProfileFollowing;