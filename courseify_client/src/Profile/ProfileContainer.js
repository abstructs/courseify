import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import { Redirect, matchPath } from 'react-router';
// import $ from 'jquery';
import PropTypes from 'prop-types';

import ProfileInfoContent from './ProfileInfoContent';
import ProfileEditContent from './ProfileEditContent';
import ProfileRecommendations from './ProfileRecommendations';
import ProfileFollowerContent from './ProfileFollowerContent';
import ProfileFollowingContent from './ProfileFollowingContent';
import { Grid, withStyles, Card, AppBar, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Divider, LinearProgress, CircularProgress } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

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
    cardContent: {
        // width: "500px"
    }
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
            tab: 1,

            // user info
            profile_info: {},

            loading: true
        }
    }

    // EFFECTS: Gets the parameters from the url react router style
    getMatch() {
        return matchPath(this.props.history.location.pathname, {
            path: '/people/:username',
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
        }));
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
        const url = this.props.match.url.split("/")[1] == "people" ? `http://localhost:3000/api/v1/users/${this.props.match.params.username}` : 
                                                                     `http://localhost:3000/api/v1/profile`;
        setTimeout(() => {
            axios.get(url)
            .then(res => {
                console.log(res)
                const profile_info = res.data.user;
                const new_profile_info = profile_info.is_current_user_profile ? profile_info : [];
                this.setState({ profile_info, new_profile_info, edit: false, loading: false });
            })
            .catch(err => {
                console.log(err);
            });
        }, 500);
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
            },
            loading: true
        })); 
    }

    handleTab = tab => _ => {
        console.log(tab);
        this.setState({ tab });
    }

    render() {
        const isLoggedIn = Auth().isAuthenticated();
        const { classes } = this.props;
        const { profile_info, loading } = this.state;
        const current_user = isLoggedIn ? Auth().paraseJwt().sub.user : {};
        
        if(!isLoggedIn && !this.getMatch()) {
            return <Redirect to='/'/>;
        }

        // if(Object.keys(this.state.profile_info).length == 0) {
        //     return <div>Loading</div>;
        // 

        console.log()

        return (
            <div className={classes.root}>
                <Grid container spacing={0} >
                    <Grid item xl={3} style={{marginRight: "50px"}}>
                        <List component="nav">
                            <ListItem button>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <Divider />
                            <ListItem component="a" button href={`${this.props.location.pathname}/recommendations`}>
                                <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Recommendations`} />
                            </ListItem>
                        </List>
                    </Grid>
                    
                    {(() => {
                        return (
                            <Grid style={{paddingTop: "50px"}} item md={8}>
                                <Card className={classes.card}>
                                    <AppBar position="static">
                                        <Tabs value={this.state.tab} >
                                            <Tab value={1} onClick={this.handleTab(1).bind(this)} label="Info" />
                                            <Tab value={2} onClick={this.handleTab(2).bind(this)} label={`Following (${!loading && profile_info.followingCount || 0})`} />
                                            <Tab value={3} onClick={this.handleTab(3).bind(this)} label={`Followers (${!loading && profile_info.followerCount || 0})`} />
                                        </Tabs>
                                    </AppBar>
                                    {loading && 
                                        <Grid container spacing={0} justify="center">
                                            <CircularProgress style={{margin: "15px"}} />
                                        </Grid>
                                    }
                                    {(() => {
                                        if(!loading) {
                                            switch(this.state.tab) {
                                                case 1:
                                                    return !this.state.edit 
                                                    ? <ProfileInfoContent toggleEdit={this.toggleEdit.bind(this)} toggleCurrentUserIsFollowing={this.toggleCurrentUserIsFollowing.bind(this)} incrementFollowers={this.incrementFollowers.bind(this)}  profile={profile_info} classes={classes} /> 
                                                    : <ProfileEditContent refreshUserInfo={this.refreshUserInfo.bind(this)} profile={profile_info} classes={classes} toggleEdit={this.toggleEdit.bind(this)} />;
                                                case 2:
                                                    return <ProfileFollowingContent profile={profile_info} classes={classes} />;
                                                case 3:
                                                    return <ProfileFollowerContent profile={profile_info} classes={classes} />;
                                            }
                                        }
                                    })()}
                                </Card>
                            </Grid>
                        );
                    })()}
                    {/* {(() => {
                        return (
                            <Grid item xs={6}>
                                {(() => {
                                    switch(this.state.tab) {
                                        case 4:
                                            return <ProfileRecommendations current_user={current_user} profile={profile_info} />;
                                }})()}
                            </Grid>
                        )
                    })()} */}
                </Grid>
                <Grid item xl={3}>
                </Grid>
            </div>
        );
    }
}

ProfileContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileContainer);