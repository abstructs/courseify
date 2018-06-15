import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import UserCard from '../User/UserCard';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
// import $ from 'jquery';
// import swal from 'sweetalert';

{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileFollowers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            followers: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3000/api/v1/users/${this.props.profile.id}/followers/`)
        .then(res => {
            const followers = res.data.followers;
            this.setState({ followers });
        })
    }

    render() {
        return (
            <div>
                {this.state.followers.map(follow => {
                    return <UserCard user={follow} />;
                })}
            </div>
        );
    }
}

export default ProfileFollowers;