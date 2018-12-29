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
    mediaFab: {
        float: "right", 
        marginTop: "-75px", 
        marginRight: "30px"
    },
    media: {
        height: 0,
        paddingTop: '30%', // 16:9
    },
});

interface IStateTypes {
    editMode: boolean
}

interface IPropTypes {
    getCurrentUser: () => ICurrentUser | null,
    followUser: (userId: number, onSuccess: () => void, onError: () => void) => void,
    unfollowUser: (userId: number, onSuccess: () => void, onError: () => void) => void,
    user: IUser,
    showSnackbar: (message: string, variant: Variant) => void,
    openEdit: () => void,
    classes: {
        media: string,
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

    handleFollow() {
        if(this.props.user.current_user_followed) {
            this.props.unfollowUser(this.props.user.id, () => {}, () => {})
        } else {
            this.props.followUser(this.props.user.id, () => {}, () => {});
        }
    }

    render() {
        const { classes, user, getCurrentUser } = this.props;

        const currentUser = getCurrentUser();

        const is_current_user_profile = currentUser != null && currentUser.id === user.id;


        return (
            <div>
                <CardMedia
                    className={classes.media}
                    image={user.image && user.image.file && user.image.imageUrl || user.banner_url || bookImage}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        @{user.username} <br/> {user.first_name} {user.last_name}

                        {currentUser && currentUser.id != user.id &&
                            <Button onClick={() => this.handleFollow()} style={{marginLeft: "15px"}}>
                                {user.current_user_followed ? "Unfollow" : "Follow"}
                            </Button>}
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