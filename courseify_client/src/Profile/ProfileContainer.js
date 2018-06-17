import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import { Redirect, matchPath } from 'react-router';
// import $ from 'jquery';
import PropTypes from 'prop-types';

import ProfileInfoContent from './ProfileInfoContent';
import ProfileEditContent from './ProfileEditContent';
import ProfileFollowerContent from './ProfileFollowerContent';
import ProfileFollowingContent from './ProfileFollowingContent';
import { Grid, Paper, withStyles, Card, CardMedia, CardContent, Typography, CardActions, Button, BottomNavigation, BottomNavigationAction, AppBar, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Create';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

// , ProfileFollowers, ProfileFollowing, ProfileInfo, ProfileRecommendation }

{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

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

class ProfileContainer extends Component {
    constructor(props) {
        super(props);

        const parsedJwt = Auth().paraseJwt();

        this.state = {
            current_user_id: parsedJwt ? parsedJwt.sub.user.id : -1,
            is_current_user_profile: false,
            edit: false,

            // tab logic
            tab: 0,

            // user info
            profile_info: {}
        }
    }

    // EFFECTS: Gets the parameters from the url react router style
    getMatch() {
        return matchPath(this.props.history.location.pathname, {
            path: '/people/:id',
            exact: true,
            strict: false
        });
    }

    componentWillMount() {
        this.refreshUserInfo();
    }

    incrementRecommendations(num) {
        this.setState(prevState => ({
            profile_info: {
                ...prevState.profile_info,
                recommendationsCount: this.state.profile_info.recommendationsCount + num
            }
        }));
    }

    toggleCurrentUserIsFollowing() {
        this.setState(prevState => ({
            profile_info: {
                ...prevState.profile_info,
                current_user_is_following: !this.state.profile_info.current_user_is_following
            }
        }))
    }

    incrementFollowers(num) {
        this.setState(prevState => ({
            profile_info: {
                ...prevState.profile_info,
                followerCount: this.state.profile_info.followerCount + num
            }
        }));
    }

    // EFFECTS: Manages the data set on the profile page depending on if it's the current users profile or another user's
    refreshUserInfo() {
        const url = this.getMatch() ? "http://localhost:3000/api/v1/users/" + this.getMatch().params.id : 
                                      "http://localhost:3000/api/v1/profile";
        axios.get(url)
        .then(res => {
            const profile_info = res.data.user;
            const new_profile_info = profile_info.is_current_user_profile ? profile_info : [];
            this.setState({ profile_info, new_profile_info, edit: false });
        })
        .catch(err => {
            console.log(err);
        });
    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit });
    }

    handleUserInfoChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            // ...prevState,
            new_profile_info: {
                ...prevState.new_profile_info,
                [name]: value
            }
        })); 
    }

    handleTab(e, tab) {
        this.setState({ tab });
    }

    render() {
        const isLoggedIn = Auth().isAuthenticated();
        const { classes } = this.props;
        const { profile_info } = this.state;
        
        if(!isLoggedIn && !this.getMatch()) {
            return <Redirect to='/'/>;
        }

        if(Object.keys(this.state.profile_info).length == 0) {
            return <div>Loading</div>;
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item lg={3}>
                        <List component="nav">
                            <ListItem button >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <Divider />
                            <ListItem button >
                                <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Recommendations`} />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item lg={6}>
                        <Card style={{margin: "50px"}} className={classes.card}>
                            <AppBar position="static">
                                <Tabs value={this.state.tab} onChange={this.handleTab.bind(this)}>
                                    <Tab value={0} label="Info" />
                                    <Tab value={1} label={`Following (${this.state.profile_info.followingCount || 0})`} />
                                    <Tab value={2} label={`Followers (${this.state.profile_info.followerCount || 0})`} />
                                </Tabs>
                            </AppBar>
                            {(() => {
                                switch(this.state.tab) {
                                    case 0:
                                        return !this.state.edit 
                                        ? <ProfileInfoContent toggleEdit={this.toggleEdit.bind(this)} toggleCurrentUserIsFollowing={this.toggleCurrentUserIsFollowing.bind(this)} incrementFollowers={this.incrementFollowers.bind(this)}  profile={profile_info} classes={classes} /> 
                                        : <ProfileEditContent refreshUserInfo={this.refreshUserInfo.bind(this)} profile={profile_info} classes={classes} toggleEdit={this.toggleEdit.bind(this)} />;
                                    case 1:
                                        return <ProfileFollowingContent profile={profile_info} classes={classes} />;
                                    case 2:
                                        return <ProfileFollowerContent profile={profile_info} classes={classes} />;
                                }
                            })()}
                        </Card>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}

ProfileContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileContainer);