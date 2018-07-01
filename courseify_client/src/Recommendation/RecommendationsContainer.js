import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import { Redirect, matchPath } from 'react-router';
// import $ from 'jquery';
import PropTypes from 'prop-types';

// import ProfileInfoContent from './ProfileInfoContent';
// import ProfileEditContent from './ProfileEditContent';
import ProfileRecommendations from '../Profile/ProfileRecommendations';
// import ProfileFollowerContent from './ProfileFollowerContent';
// import ProfileFollowingContent from './ProfileFollowingContent';
import { Grid, withStyles, Card, AppBar, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Divider, LinearProgress, CircularProgress, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

class RecommendationsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,

            // tab logic
            tab: 1,

            // user info
            profile: {},

            loading: true,
        
            current_user: Auth().isAuthenticated() ? Auth().paraseJwt().sub.user : {}
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

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        const param_id = parseInt(this.props.match.params.username);
        const url = param_id != this.state.current_user.id ? `http://localhost:3000/api/v1/users/${param_id}` 
            : "http://localhost:3000/api/v1/profile";

        axios.get(url)
        .then(res => {
            const profile = res.data.user;

            console.log(profile)

            this.setState({ profile, loading: false });
        })
        .catch(err => {
            console.log(err);
        });

    }

    // componentWillMount() {
    //     this.refreshUserInfo();
    // }

    incrementRecommendations(num) {
        this.setState(prevState => ({
            profile_info: {
                ...prevState.profile_info,
                recommendationsCount: this.state.profile_info.recommendationsCount + num
            }
        }));
    }

    // toggleCurrentUserIsFollowing() {
    //     this.setState(prevState => ({
    //         profile_info: {
    //             ...prevState.profile_info,
    //             current_user_is_following: !this.state.profile_info.current_user_is_following
    //         }
    //     }));
    // }

    // incrementFollowers(num) {
    //     this.setState(prevState => ({
    //         profile_info: {
    //             ...prevState.profile_info,
    //             followerCount: this.state.profile_info.followerCount + num
    //         }
    //     }));
    // }

    // EFFECTS: Manages the data set on the profile page depending on if it's the current users profile or another user's
    // refreshUserInfo() {
    //     const url = this.getMatch() ? "http://localhost:3000/api/v1/users/" + this.getMatch().params.id : 
    //                                   "http://localhost:3000/api/v1/profile";
    //     setTimeout(() => {
    //         axios.get(url)
    //         .then(res => {
    //             const profile_info = res.data.user;
    //             const new_profile_info = profile_info.is_current_user_profile ? profile_info : [];
    //             this.setState({ profile_info, new_profile_info, edit: false, loading: false });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     }, 500);
    // }


    render() {
        const isLoggedIn = Auth().isAuthenticated();
        const { classes } = this.props;
        const { profile, loading, current_user } = this.state;
        // const current_user = isLoggedIn ? Auth().paraseJwt().sub.user : {};
        
        if(!isLoggedIn && !this.getMatch()) {
            return <Redirect to='/'/>;
        }

        // if(Object.keys(this.state.profile_info).length == 0) {
        //     return <div>Loading</div>;
        // }

        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify="space-between">
                    <Grid item xl={3}>
                        <List component="nav">
                            <ListItem button component="a" href={`${this.props.location.pathname.split("/").slice(0,-1).join("/")}`}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Recommendations`} />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={40} style={{marginBottom: "40px"}}>
                            <Grid item xs={12}>
                                
                                <Typography variant="display1" align="left" style={{marginTop: "50px"}} color="textSecondary">
                                    Recommendations
                                </Typography>
                                <Typography variant="caption" align="left" style={{marginTop: "5px"}} color="textSecondary">
                                    Courses that <b>{profile.email}</b> has recommended.
                                </Typography>
                                {/* <Fade in={!loading && !this.state.expanded}>
                                    <Button onClick={this.handleExpandClick.bind(this)} disabled={this.state.expanded} color="primary" style={{float: "right"}}>Add A Course</Button>
                                </Fade> */}
                            </Grid>
                            
                            {/* <Grid item xs={12}>
                                <CourseAddExpansion handleCourseAddSuccess={this.handleCourseAddSuccess.bind(this)} showSnackbar={this.showSnackbar.bind(this)} handleCancel={this.handleCancel.bind(this)} classes={classes} expanded={this.state.expanded} />
                            </Grid> */}
                        </Grid> 
                        {loading ? <div></div>
                        :
                            <ProfileRecommendations current_user={current_user} profile={profile} />
                        }
                    </Grid>
                    <Grid item xs={2} style={{width: "100%"}}>

                        {/* <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Top Authors</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Top People</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel disabled>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Top Courses</Typography>
                            </ExpansionPanelSummary>
                        </ExpansionPanel> */}
                        </Grid>
                </Grid>
            </div>
        );
    }
}

RecommendationsContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendationsContainer);