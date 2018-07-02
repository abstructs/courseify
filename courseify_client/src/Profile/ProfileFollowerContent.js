import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import UserCard from '../User/UserCard';
import { CardContent } from '@material-ui/core';

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
        const { classes } = this.props;
        return (
            <CardContent className={classes.cardContent}>
                {this.state.followers.map(follow => {
                    return <UserCard key={follow.id} user={follow} />;
                })}
            </CardContent>
        );
    }
}

export default ProfileFollowers;