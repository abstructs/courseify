import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { CardMedia, CardContent, Typography, Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Create';
import bookImage from '../images/book.jpeg';
import PropTypes from 'prop-types';
import Auth from '../Auth';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
        textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "25%",
    },
    media: {
        height: 0,
        // paddingTop: '56.25%', // 16:9
        paddingTop: '30%', // 16:9
        // maxHeight: "200px"
    },
});

class ProfileInfoContent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            profile: props.profile
        }
    }

    handleFollow(e) {
        const { profile } = this.state;

        if(profile.current_user_is_following) {
            this.unfollow(profile.id);
        } else {
            this.follow(profile.id);
        }
    }

    follow(user_id) {
        axios.post("http://localhost:3000/api/v1/follows", { user_id })
        .then(res => {
            this.setState(prevState => ({ 
                profile: {
                    ...prevState.profile,
                    current_user_is_following: true
                }
            }))
        })
        .then(_ => {
            this.props.incrementFollowers(1);
        })
        .then(_ => this.props.toggleCurrentUserIsFollowing());
    }

    unfollow(user_id) {
        if(this.state.is_current_user_profile) return;
        axios.delete("http://localhost:3000/api/v1/follows/" + user_id)
        .then(res => {
            this.setState(prevState => ({ 
                profile: {
                    ...prevState.profile,
                    current_user_is_following: false
                }
            }))
        })
        .then(_ => {
            this.props.incrementFollowers(-1);
        })
        .then(_ => this.props.toggleCurrentUserIsFollowing());
    }

    render() {
        const { classes, toggleEdit } = this.props;
        const { profile } = this.state;

        const isLoggedIn = Auth().isAuthenticated();
        const is_current_user_profile = isLoggedIn ? Auth().paraseJwt().sub.user.id === profile.id : false;

        return (
            <div>
                <CardMedia
                className={classes.media}
                image={profile.banner_url}
                title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="headline" component="h2">
                        @{profile.username} <br/> {profile.first_name} {profile.last_name}
                        {profile.is_current_user_profile ? 
                            <div></div>
                        :
                            isLoggedIn &&
                                <Button onClick={this.handleFollow.bind(this)} style={{marginLeft: "15px"}}>
                                    {profile.current_user_is_following ? "Unfollow" : "Follow"}
                                </Button>
                        }
                        { 
                            is_current_user_profile && 
                                <Button onClick={toggleEdit} style={{float: "right", marginTop: "-108px", marginRight: "30px"}} variant="fab" color="secondary" aria-label="add" className={classes.button}>
                                    <EditIcon />
                                </Button>
                        }
                    </Typography>

                    <Typography gutterBottom variant="subheading">
                        is a {profile.headline} from {profile.country}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Summary
                    </Typography>
                    <Typography component="body1">
                        {profile.summary}
                    </Typography>
                </CardContent>
            </div>
        );
    }
}

ProfileInfoContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileInfoContent);