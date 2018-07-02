import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import UserCard from '../User/UserCard';
import { CardContent } from '@material-ui/core';

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileFollowing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            following: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/v1/users/${this.props.profile.username}/following/`)
        .then(res => {
            const following = res.data.following;
            console.log(following)

            this.setState({ following });
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <CardContent className={classes.cardContent}>
                {this.state.following.map(follow => {
                    return <UserCard key={follow.id} user={follow} />;
                })}
            </CardContent>
        );
    }
}

export default ProfileFollowing;