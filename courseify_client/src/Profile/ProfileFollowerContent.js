import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import UserCard from '../User/UserCard';
import { CardContent, Typography } from '@material-ui/core';

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileFollowers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            followers: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/v1/users/${this.props.profile.id}/followers/`)
        .then(res => {
            const followers = res.data.followers;
            this.setState({ followers });
            console.log("res")
            
        })
        .catch(err => {
            console.log("err")
        })
    }

    render() {
        
        const { classes, profile } = this.props;
        const { followers } = this.state;
        
        if(followers.length == 0) {
            return (
                <Typography style={{margin: "50px"}} variant="headline" align="center">Looks like @{profile.username} doesn't have any followers.</Typography>
            );
        }
        
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