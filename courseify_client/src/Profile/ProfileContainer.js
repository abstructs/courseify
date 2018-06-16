import React, { Component } from 'react';
import '../App.css';
import bookImage from '../images/book.jpeg';
import axios from 'axios';
import Auth from '../Auth';
import { Redirect, matchPath } from 'react-router';
import teacherImage from '../images/laptop.jpeg';
// import $ from 'jquery';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

import ProfileEditContent from './ProfileEditContent';
import ProfileFollowerContent from './ProfileFollowerContent';
import ProfileFollowingContent from './ProfileFollowingContent';
import ProfileInfo from './ProfileInfo';
import ProfileRecommendation from './ProfileRecommendation';
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

        // const is_profile = 
        const parsedJwt = Auth().paraseJwt();

        this.state = {
            current_user_id: parsedJwt ? parsedJwt.sub.user.id : -1,
            is_current_user_profile: false,
            edit: false,
            save: false,
            follow_info: {
                is_following: false,
                id: -1
            },

            // tab logic
            tab: 0,
            // for profile edit
            new_profile_info: {},

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

        // const data = this.getMatch() ? {} : { headers: Auth().headers() };
        axios.get(url)
        .then(res => {
            const profile_info = res.data.user;
            // const is_current_user_profile = res.data.user.id === this.state.current_user_id;
            const new_profile_info = profile_info.is_current_user_profile ? profile_info : [];
            // const follow_info = profile_info.follow_info;
            // console.log(profile_info)

            // this.setState({ profile_info, new_profile_info, is_current_user_profile, follow_info });
            this.setState({ profile_info, new_profile_info });

            
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

        // console.log(this.state)
    }

    handleSave(e) {
        axios.put("http://localhost:3000/api/v1/users/" + this.state.current_user_id, this.state.new_profile_info)
        .then(res => swal({
                title: "Success",
                text: "The new profile is looking sexy ;)!",
                icon: "success"
            })
        )
        .then(_ => this.refreshUserInfo())
        .then(_ => this.setState({edit: !this.state.edit}))
        .catch(err => {
            swal({
                title: "Something went wrong!",
                // text: "Please check the error messages!",
                text: "Todo: error message here",
                icon: "error",
                dangerMode: true
                // text: err.response.data
            })
        });        
    }

    handleEdit(e) {
        this.setState({edit: !this.state.edit});
    }

    handleCancel(e) {
        this.setState({edit: false});
    }

    handleFollow(e) {
        if(this.state.profile_info.is_current_user_profile) return;
        axios.post("http://localhost:3000/api/v1/follows", { followed_id: this.state.profile_info.id })
        .then(res => {
            this.setState(prevState => ({
                follow_info: {
                    ...prevState.follow_info,
                    is_following: true
                }
            }))
        })
        .then(res => {
            this.refreshUserInfo();
        })
    }

    handleTab(e, tab) {
        this.setState({ tab });
    }

    handleUnfollow(e) {
        if(this.state.is_current_user_profile) return;
        axios.delete("http://localhost:3000/api/v1/follows/" + this.state.follow_info.follow_id)
        .then(res => {
            this.setState(prevState => ({
                follow_info: {
                    ...prevState.follow_info,
                    is_following: false
                }
            }))
        })
        .then(res => {
            this.refreshUserInfo();
        })
    }

    render() {
        const isLoggedIn = Auth().isAuthenticated();
        
        if(!isLoggedIn && !this.getMatch()) {
            return <Redirect to='/'/>;
        }

        if(Object.keys(this.state.profile_info).length == 0) {
            return <div>Loading</div>;
        }

        const middleSection = this.state.edit ? <ProfileEditContent refreshUserInfo={this.refreshUserInfo.bind(this)} new_user_info={this.state.new_profile_info} handleUserInfoChange={this.handleUserInfoChange.bind(this)} /> : <ProfileInfo user_info={this.state.profile_info}/>;

        const editFunctions = !this.state.edit ? (this.state.tab == "info" ? <a href="#edit" className="btn m-2 text-white m-auto text-center" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleEdit.bind(this)}>Edit</a> : <div></div>)
                                              :
                                                <div>
                                                    <a href="#save" className="btn text-white m-auto text-center" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleSave.bind(this)}>Save</a>
                                                    <a href="#cancel" className="btn text-white m-2 text-center btn-primary" style={{width: "250px"}} onClick={this.handleCancel.bind(this)}>Cancel</a>
                                                </div>;
        const otherFunctions = <div>
                                <div className="mb-2 text-center">
                                    {
                                        this.state.follow_info.is_following ?
                                        <a onClick={ this.handleUnfollow.bind(this) } href="#" className="btn text-white m-auto text-center" style={{backgroundColor: "#ff6000", width: "250px"}}>Unfollow</a>
                                        :
                                        <a onClick={this.handleFollow.bind(this)} href="#" className="btn text-white m-auto text-center" style={{backgroundColor: "#ff6000", width: "250px"}}>Follow</a>
                                    }
                                    

                                </div>
                                {/* <div className="mb-2 text-center">
                                    <a href="#message" className="btn btn-primary text-white m-auto text-center" style={{width: "250px"}}>Message</a>
                                </div> */}
                               </div>;

        const content = () => {
            switch(this.state.tab) {
                case "info":
                    return middleSection;
                case "recommendations":
                    return <ProfileRecommendation incrementRecommendations={this.incrementRecommendations.bind(this)} profile_info={this.state.profile_info} />;
                case "following":
                    return <ProfileFollowingContent profile_info={this.state.profile_info} />;
                case "followers":
                    return <ProfileFollowerContent profile_info={this.state.profile_info} />;
                default:
                    return <div>Something went wrong :(.</div>;
            }
        }

        if(!this.state.profile_info) {
            return <div>Loading</div>;
        }

        const { classes } = this.props;
        const { profile_info } = this.state;

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
                            {/* <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItem> */}
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
                            {/* {0 === 0 && <TabContainer>Item One</TabContainer>}
                            {0 === 1 && <TabContainer>Item Two</TabContainer>}
                            {0 === 2 && <TabContainer>Item Three</TabContainer>} */}
                            {/* <CardMedia
                            className={classes.media}
                            image={bookImage}
                            title="Contemplative Reptile"
                            /> */}
                            {/* {this.state.tab === 0 ? 
                            : } */}
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

                            
                            <CardActions>
                                <BottomNavigation
                                    value={-1}
                                    onChange={this.handleChange}
                                    showLabels
                                    className={classes.root}
                                >
                                    {/* <BottomNavigationAction label="Ping"/>
                                    <BottomNavigationAction label="Message"/> */}
                                    {/* <BottomNavigationAction label="Following"/> */}
                                </BottomNavigation>
                                {/* <Button href={`/people/${profile_info.id}`} size="small" color="primary">
                                    Check Out Their Profile
                                </Button> */}
                                {/* <Button size="small" color="primary">
                                    Message
                                </Button> */}
                            </CardActions>
                        </Card>
                    </Grid>
                    
                </Grid>
                {/* {this.state.profile_info.first_name} */}
                {/* <header className="bg-dark border-0 pt-5" style={{marginBottom: "0px", height: "150px", backgroundImage: "url(" + teacherImage +")", backgroundPosition: "250px 660px"}}>
                    
                </header>
                <section>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="rounded-circle border border-white bg-dark ml-auto mr-auto p-auto text-center" style={{height: "150px", width: "150px", marginTop: "-70px"}}></div>   
                                <h2 className="text-dark text-center font-weight-light p-auto">{this.state.profile_info.first_name + " " + this.state.profile_info.last_name}</h2>
                                <div className="mb-2 mt-4 text-center">
                                { isLoggedIn ? (this.state.is_current_user_profile ? editFunctions : otherFunctions) : <div></div> }
                            </div>

                        </div>  
                        <div className  ="col-xl-5 m-4 text-center text-justify">
                            <ul className="nav nav-tabs nav-fill mb-4">
                                <li name="nav-item">
                                    <a href="#" className={"nav-link " + (this.state.tab == "info" ? "active" : "")} onClick={() => {this.setState({tab: "info"})}}>Info</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={"nav-link " + (this.state.tab == "recommendations" ? "active" : "")} onClick={() => {this.setState({tab: "recommendations"})}}>Recommendations ({this.state.profile_info.recommendationsCount || 0})</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={"nav-link " + (this.state.tab == "followers" ? "active" : "")} onClick={() => {this.setState({tab: "followers"})}}>Followers ({this.state.profile_info.followerCount || 0})</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={"nav-link " + (this.state.tab == "following" ? "active" : "")} onClick={() => {this.setState({tab: "following"})}}>Following ({this.state.profile_info.followingCount || 0})</a>
                                </li>
                            </ul>
                            {content()}
                        </div>
                    </div>
                </section> */}
            </div>
        );
    }
}

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

        return (
            <div>
                <CardMedia
                className={classes.media}
                image={bookImage}
                title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {profile.first_name} {profile.last_name} 
                        {profile.is_current_user_profile ? 
                            <div></div>
                        :
                            <Button onClick={this.handleFollow.bind(this)} style={{marginLeft: "15px"}}>
                                {profile.current_user_is_following ? "Unfollow" : "Follow"}
                            </Button>
                        }
                        <Button onClick={toggleEdit} style={{float: "right", marginTop: "-75px", marginRight: "30px"}} variant="fab" color="secondary" aria-label="add" className={classes.button}>
                            <EditIcon />
                        </Button>
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

ProfileContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileContainer);