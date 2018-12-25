import * as React from 'react';
import { Theme, CardMedia, CardContent, Typography, withStyles, Button, createStyles } from '@material-ui/core';
import { IUser, ICurrentUser } from 'src/Services/UserService';
// import { CardMedia, CardContent, Typography, Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Create';
import { Variant } from 'src/Helpers/AppSnackbar';
// import ProfileEditContent from './ProfileEditContent';
// import ProfileEditContent from './containers/ProfileEditContent';

const bookImage = require('../../images/book.jpeg');

const styles = ({ palette, spacing }: Theme) => createStyles({
    // root: {
    //   flexGrow: 1,
    // },
    // paper: {
    //   padding: spacing.unit * 2,
    //   textAlign: 'center',
    //   color: palette.text.secondary,
    // },
    // container: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    //     textField: {
    //     marginLeft: spacing.unit,
    //     marginRight: spacing.unit,
    //     width: "25%",
    // },
    mediaFab: {
        float: "right", 
        marginTop: "-75px", 
        marginRight: "30px"
    },
    media: {
        height: 0,
        // paddingTop: '56.25%', // 16:9
        paddingTop: '30%', // 16:9
        // maxHeight: "200px"
    },
    cardContent: {

    }
});

interface IStateTypes {
    // user: IUser,
    editMode: boolean
}

interface IPropTypes {
    getCurrentUser: () => ICurrentUser | null,
    user: IUser,
    showSnackbar: (message: string, variant: Variant) => void,
    openEdit: () => void,
    classes: {
        media: string,
        cardContent: string,
        // button: string,
        mediaFab: string
    }
}

class ProfileInfoContent extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);
        
        this.state = {
            editMode: false
        }
    }

    // handleFollow(e) {
    //     const { profile } = this.state;

    //     if(profile.current_user_is_following) {
    //         this.unfollow(profile.id);
    //     } else {
    //         this.follow(profile.id);
    //     }
    // }

    // follow(user_id) {
    //     axios.post(`${process.env.REACT_APP_API_URL}/api/v1/follows`, { user_id })
    //     .then(res => {
    //         this.setState(prevState => ({ 
    //             profile: {
    //                 ...prevState.profile,
    //                 current_user_is_following: true
    //             }
    //         }))
    //     })
    //     .then(_ => {
    //         this.props.incrementFollowers(1);
    //     })
    //     .then(_ => this.props.toggleCurrentUserIsFollowing());
    // }

    // unfollow(user_id) {
    //     if(this.state.is_current_user_profile) return;
    //     axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/follows/` + user_id)
    //     .then(res => {
    //         this.setState(prevState => ({ 
    //             profile: {
    //                 ...prevState.profile,
    //                 current_user_is_following: false
    //             }
    //         }))
    //     })
    //     .then(_ => {
    //         this.props.incrementFollowers(-1);
    //     })
    //     .then(_ => this.props.toggleCurrentUserIsFollowing());
    // }

    // toggleEditMode() {
    //     this.setState({
    //         editMode: !this.state.editMode
    //     });
    // }

    render() {
        const { classes, user, getCurrentUser } = this.props;
        // const { editMode } = this.state;

        // const isLoggedIn = Auth().isAuthenticated();
        // const is_current_user_profile = isLoggedIn ? Auth().paraseJwt().sub.user.id === profile.id : false;
        const currentUser = getCurrentUser();

        const is_current_user_profile = currentUser != null ? currentUser.id === user.id : false;

        return (
            <div>
                <CardMedia
                className={classes.media}
                image={user.banner_url || bookImage}
                title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="headline" component="h2">
                        @{user.username} <br/> {user.first_name} {user.last_name}
                        {/* {user.is_current_user_profile ? 
                            <div></div>
                        :
                            isLoggedIn &&
                                <Button onClick={this.handleFollow.bind(this)} style={{marginLeft: "15px"}}>
                                    {profile.current_user_is_following ? "Unfollow" : "Follow"}
                                </Button>
                        } */}
                        {
                            is_current_user_profile && 
                                <Button onClick={this.props.openEdit} variant="fab" color="secondary" aria-label="add" className={classes.mediaFab}>
                                    <EditIcon />
                                </Button>
                        }
                    </Typography>

                    <Typography gutterBottom variant="subheading">
                        is a {user.headline} from {user.country}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Summary
                    </Typography>
                    <Typography>
                        {user.summary}
                    </Typography>
                </CardContent>
            </div>
        );
    }
}
    

export default withStyles(styles)(ProfileInfoContent);