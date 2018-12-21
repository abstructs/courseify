import * as React from 'react';
import { Theme, CardMedia, CardContent, Typography, withStyles } from '@material-ui/core';
import { IUser } from 'src/Services/UserService';
// import { CardMedia, CardContent, Typography, Button, withStyles } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Create';

const bookImage = require('../images/book.jpeg');

const styles = ({ palette, spacing }: Theme) => ({
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
    // user: IUser
}

interface IPropTypes {
    user: IUser,
    classes: {
        media: string,
        cardContent: string
    }
}

class ProfileInfoContent extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);
        
        this.state = {
            user: props.user
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

    render() {
        const { classes, user } = this.props;
        // const {  } = this.state;

        // const isLoggedIn = Auth().isAuthenticated();
        // const is_current_user_profile = isLoggedIn ? Auth().paraseJwt().sub.user.id === profile.id : false;

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
                            // is_current_user_profile && 
                            //     <Button onClick={toggleEdit} style={{float: "right", marginTop: "-108px", marginRight: "30px"}} variant="fab" color="secondary" aria-label="add" className={classes.button}>
                            //         <EditIcon />
                            //     </Button>
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