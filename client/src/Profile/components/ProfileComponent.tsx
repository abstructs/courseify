import * as React from 'react';
// import '../App.css';
// import axios from 'axios';
// import Auth from '../User/Auth';
// import $ from 'jquery';
import { withStyles, Theme, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Card, AppBar, Tabs, Tab } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
// import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { IUser, UserService, IEditUserForm, ICurrentUser } from 'src/Services/UserService';
import ProfileContent from './ProfileContent';
import AppSnackbar, { Variant } from '../../Helpers/AppSnackbar';
import { IImage } from 'src/Services/CourseService';
import UserCard from 'src/User/UserCard';
import CourseCard from 'src/Course/CourseCard';

// const bookImage = require('../../images/book.jpeg');

const styles = ({ spacing, palette }: Theme) => ({
    root: {
      flexGrow: 1,
    },
    card: {

    }
});

interface IPropTypes {
    getCurrentUser: () => ICurrentUser | null,
    classes: {
        card: string,
        root: string
    },
    match: {
        params: {
            username: string
        }
    }
}

interface IStateTypes {
    user: IUser,
    // editMode: boolean, 
    tab: IProfileTab,
    userFound: boolean,
    loading: boolean
}

enum IProfileTab {
    Main = 1,
    Following = 2, 
    Followers = 3,
    Recommendations = 4
}

const defaultImageState: IImage = {
    fileName: "",
    imageUrl: "",
    file: null
}

class ProfileComponent extends React.Component<IPropTypes, IStateTypes> {

    private userService: UserService;
    private showSnackbar: (message: string, variant: string) => void;

    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            // editMode: false,
            tab: IProfileTab.Main,

            user: {
                id: 0,
                email: "",
                username: "",
                first_name: "",
                last_name: "",
                headline: "",
                education: "",
                country: "",
                industry: "",
                summary: "",
                banner_url: "",
                image: defaultImageState,
                current_user_followed: false,
                followers: [],
                following: [],
                recommendations: []
            },
            userFound: false,
            loading: true
        }

        this.userService = new UserService();
    }

    componentDidMount() {
        this.getUser(() => {});
    }

    setShowSnackbar(openSnackbar: (message: string, variant: string) => void) {
        this.showSnackbar = openSnackbar;
    }

    getUsername() {
        return this.props.match.params.username;
    }

    onUserNotFound() {
        this.setState({
            loading: false,
            userFound: false
        }, () => this.showSnackbar("Couldn't find that user.", Variant.Error));
    }

    onUserFound(user: IUser, onSuccess: () => void) {
        if(user) {
            this.setState({
                user,
                loading: false,
                userFound: true
            }, onSuccess);
        }
    }

    getUser(onSuccess: () => void) {
        let username = this.getUsername();
        const currentUser = this.props.getCurrentUser();

        if(username) {
            this.userService.getOne(username, (user: IUser) => this.onUserFound(user, onSuccess), () => this.onUserNotFound());
        } else if(currentUser) {
            this.userService.getCurrentUserProfile((user: IUser) => this.onUserFound(user, onSuccess), () => this.onUserNotFound());
        } else {    
            this.onUserNotFound();
        }
    }

    setBannerUrl(banner_url: string | null) {
        this.setState({
            user: {
                ...this.state.user,
                banner_url
            }
        });
    }

    setBanner(file: File | null) {
        this.setState({
            user: {
                ...this.state.user,
                banner: {
                    imageUrl: file ? URL.createObjectURL(file) : "",
                    fileName: file ? file.name : "",
                    file
                }
            }
        });
    }

    followUser(userId: number, onSuccess: () => void, onError: () => void) {
        this.userService.follow(userId, () => {
            this.setState({
                user: {
                    ...this.state.user,
                    current_user_followed: true 
                }
            }, () => this.getUser(onSuccess));
        }, onError);
    }

    unfollowUser(userId: number, onSuccess: () => void, onError: () => void) {
        this.userService.unfollow(userId, () => {
            this.setState({
                user: {
                    ...this.state.user,
                    current_user_followed: false
                }
            }, () => this.getUser(onSuccess));
        }, onError);
    }

    updateUser(form: IEditUserForm, onSuccess: () => void, onError: () => void) {
        this.userService.updateUser(form, (res) => {
            this.getUser(onSuccess);
        }, (err) => {
            onError();
        });
    }

    deleteBanner(userId: number, onSuccess: () => void, onError: () => void) {
        this.userService.deleteBanner(userId, onSuccess, onError);
    }

    handleTab(tab: IProfileTab) {
        this.setState({
            tab
        });
    }

    render() {
        const { classes } = this.props;
        const { user, userFound, loading } = this.state;

        if(!loading && !userFound) {
            return (
                <div>User not found.</div>
            )
        }

        return (
            <div className={classes.root}>
                <AppSnackbar setOpenSnackbar={this.setShowSnackbar.bind(this)} />

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
                            {/* <ListItem component="a" button href={`${this.props.location.pathname}/recommendations`}>
                                <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Recommendations`} />
                            </ListItem> */}
                        </List>
                    </Grid>
                    
                    {(() => {
                        return (
                            <Grid style={{paddingTop: "50px"}} item md={8}>
                                <Card className={classes.card}>
                                    <AppBar position="static">
                                        <Tabs value={this.state.tab} >  
                                            <Tab onClick={() => this.handleTab(IProfileTab.Main)} value={IProfileTab.Main} label="Info" />
                                            <Tab onClick={() => this.handleTab(IProfileTab.Recommendations)} value={IProfileTab.Recommendations} label="Recommendations" />
                                            <Tab onClick={() => this.handleTab(IProfileTab.Following)} value={IProfileTab.Following} label={`Following (${user.following ? user.following.length : 0})`} />
                                            <Tab onClick={() => this.handleTab(IProfileTab.Followers)} value={IProfileTab.Followers} label={`Followers (${user.followers ? user.followers.length : 0})`} />
                                        </Tabs>
                                    </AppBar>
                                    {
                                        (() => {
                                            switch(this.state.tab) {
                                                case IProfileTab.Main: 
                                                    return (
                                                        <ProfileContent
                                                            followUser={this.followUser.bind(this)}
                                                            unfollowUser={this.unfollowUser.bind(this)}
                                                            getCurrentUser={this.props.getCurrentUser}
                                                            user={user}
                                                            setBannerUrl={(banner_url: string | null) => this.setBannerUrl(banner_url)}
                                                            setBanner={(file: File | null) => this.setBanner(file)}
                                                            showSnackbar={(message: string, variant: Variant) => this.showSnackbar(message, variant)}
                                                            deleteBanner={this.deleteBanner.bind(this)}
                                                            updateUser={(form: IEditUserForm, onSuccess: () => void, onError: () => void) => this.updateUser(form, onSuccess, onError)} 
                                                        /> 
                                                    );
                                                case IProfileTab.Recommendations:
                                                    return (
                                                        <Grid container spacing={0}>
                                                            <Grid item md={3}></Grid>
                                                            {user.recommendations.map((recommendation, index) => {
                                                                return (
                                                                    <Grid item xs={6}>
                                                                        <CourseCard 
                                                                            key={index}
                                                                            currentUser={this.props.getCurrentUser()}
                                                                            course={recommendation.course} 
                                                                            showSnackbar={(message: string, variant: Variant) => this.showSnackbar(message, variant)}
                                                                        />
                                                                    </Grid>
                                                                );
                                                            })}
                                                            <Grid item md={3}></Grid>
                                                        </Grid>
                                                    );
                                                case IProfileTab.Following:
                                                    return (
                                                        <div>
                                                            {user.following.map((user, index) => {
                                                                return <UserCard key={index} user={user} />;
                                                            })}
                                                        </div>
                                                    );
                                                case IProfileTab.Followers:
                                                    return (
                                                        <div>
                                                            {user.followers.map((user, index) => {
                                                                return <UserCard key={index} user={user} />;
                                                            })}
                                                        </div>
                                                    );
                                                default:
                                                    return <div></div>;
                                            }  
                                        })()
                                    }

                                    {/* {loading && 
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
                                    })()} */}
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

export default withStyles(styles)(ProfileComponent);