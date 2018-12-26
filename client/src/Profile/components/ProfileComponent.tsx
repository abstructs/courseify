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

const bookImage = require('../../images/book.jpeg');

const styles = ({ spacing, palette }: Theme) => ({
    root: {
      flexGrow: 1,
    },
    // paper: {
    //   padding: spacing.unit * 2,
    //   textAlign: 'center',
    //   color: palette.text.secondary,
    // },
    // container: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    // textField: {
    //     marginLeft: spacing.unit,
    //     marginRight: spacing.unit,
    //     width: "25%",
    // },
    // media: {
    //     height: 0,
    //     // paddingTop: '56.25%', // 16:9
    //     paddingTop: '30%', // 16:9
    //     // maxHeight: "200px"
    // },
    // cardContent: {
    //     // width: "500px"
    // },
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
    Followers = 3
}

const defaultImageState: IImage = {
    fileName: "",
    imageUrl: bookImage,
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
                image: defaultImageState
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

    // toggleEditMode() {
    //     this.setState({
    //         editMode: !this.state.editMode
    //     });
    // }

    // EFFECTS: Gets the parameters from the url react router style
    // getMatch() {
        
        // return matchPath(this.props.history.location.pathname, {
        //     path: '/people/:username',
        //     exact: true,
        //     strict: false
        // });
    // }

    // componentDidMount() {
    //     this.refreshUserInfo();
    // }

    // incrementRecommendations(num) {
    //     this.setState(prevState => ({
    //         profile_info: {
    //             ...prevState.profile_info,
    //             recommendationsCount: this.state.profile_info.recommendationsCount + num
    //         }
    //     }));
    // }

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
    //     const url = this.props.match.url.split("/")[1] == "people" ? `${process.env.REACT_APP_API_URL}/api/v1/users/${this.props.match.params.username}` : 
    //                                                                  `${process.env.REACT_APP_API_URL}/api/v1/profile`;
    //     setTimeout(() => {
    //         axios.get(url)
    //         .then(res => {
    //             const isLoggedIn = Auth().isAuthenticated();
    //             const profile_info = res.data.user;
    //             const new_profile_info = isLoggedIn && profile_info.is_current_user_profile ? profile_info : [];
                
    //             this.setState({ profile_info, new_profile_info, edit: false, loading: false });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     }, 500);
    // }

    // toggleEdit() {
    //     this.setState({ edit: !this.state.edit });
    // }

    // handleUserInfoChange(event) {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState(prevState => ({
    //         // ...prevState,
    //         new_profile_info: {
    //             ...prevState.new_profile_info,
    //             [name]: value
    //         },
    //         loading: true
    //     })); 
    // }

    // handleTab = tab => _ => {
    //     console.log(tab);
    //     this.setState({ tab });
    // }

    updateUser(form: IEditUserForm, onSuccess: () => void, onError: () => void) {
        this.userService.updateUser(form, (res) => {
            this.getUser(onSuccess);
        }, (err) => {
            onError();
        });
    }

    setImage(file: File) {
        this.setState({
            user: {
                ...this.state.user,
                image: {
                    imageUrl: URL.createObjectURL(file),
                    fileName: file.name,
                    file
                }
            }
        })
    }
    


    render() {
        const { classes } = this.props;
        const { user, userFound, loading } = this.state;

        if(!loading && !userFound) {
            return (
                <div>User not found.</div>
            )
        }

        // const current_user = isLoggedIn ? Auth().paraseJwt().sub.user : {};
        
        // if(!isLoggedIn && !this.getMatch()) {
        //     return <Redirect to='/'/>;
        // }

        // if(Object.keys(this.state.profile_info).length == 0) {
        //     return <div>Loading</div>;
        // 

        // console.log(profile_info)

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
                                        {/* onClick={this.handleTab(1).bind(this)}  */}
                                            <Tab value={IProfileTab.Main} label="Info" />
                                            {/* <Tab value={2} label={`Following (${!loading && profile_info.followingCount || 0})`} /> */}
                                            {/* <Tab value={3} label={`Followers (${!loading && profile_info.followerCount || 0})`} /> */}
                                        </Tabs>
                                    </AppBar>

                                    {
                                        (() => {
                                            switch(this.state.tab) {
                                                case IProfileTab.Main: 
                                                    return (
                                                        <ProfileContent
                                                            getCurrentUser={this.props.getCurrentUser}
                                                            user={user}
                                                            setImage={(file: File) => this.setImage(file)}
                                                            showSnackbar={(message: string, variant: Variant) => this.showSnackbar(message, variant)}
                                                            updateUser={(form: IEditUserForm, onSuccess: () => void, onError: () => void) => this.updateUser(form, onSuccess, onError)} 
                                                        /> 
                                                    );
                                                default:
                                                    return <div></div>
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