import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import UserCard from '../User/UserCard';

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileFollowing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            following: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3000/api/v1/users/${this.props.profile.id}/following/`)
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
                    return <UserCard key={follow.id} user={follow} />;
                })}
            </div>
        );
    }
}

export default ProfileFollowing;