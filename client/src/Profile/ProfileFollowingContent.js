import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../User/Auth';
import UserCard from '../User/UserCard';
import { CardContent, Typography } from '@material-ui/core';

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileFollowing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            following: [],
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/${this.props.profile.username}/following/`)
        .then(res => {
            const following = res.data.following;
            console.log(following)

            this.setState({ following });
        })
    }

    render() {
        const { classes, profile } = this.props;
        const { following } = this.state;

        if(following.length == 0) {
            return (
                <Typography style={{margin: "50px"}} variant="headline" align="center">Looks like @{profile.username} isn't following anyone.</Typography>
            );
        }

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