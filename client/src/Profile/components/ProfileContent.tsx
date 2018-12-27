import * as React from 'react';
import { Theme, withStyles } from '@material-ui/core';
import { IUser, IEditUserForm, ICurrentUser } from 'src/Services/UserService';
// import { CardMedia, CardContent, Typography, Button, withStyles } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Create';
import ProfileEditContent from '../containers/ProfileEditContent';
import ProfileInfoContent from '../containers/ProfileInfoContent';
import { Variant } from 'src/Helpers/AppSnackbar';
// import ProfileEditContent from './containers/ProfileEditContent';

// const bookImage = require('../../images/book.jpeg');

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
    user: IUser,
    editMode: boolean
}

interface IPropTypes {
    setBanner: (file: File) => void, 
    setBannerUrl: (banner_url: string) => void,
    getCurrentUser: () => ICurrentUser | null,
    updateUser: (form: IEditUserForm, onSuccess: () => void, onError: () => void) => void,
    deleteBanner: (userId: number, onSuccess: () => void, onError: () => void) => void,
    showSnackbar: (message: string, variant: Variant) => void,
    user: IUser,
    classes: {
        media: string,
        cardContent: string,
        button: string
    }
}

class ProfileContent extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);
        
        this.state = {
            user: props.user,
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

    openEdit() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    closeEdit() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    render() {
        const { user } = this.props;
        const { editMode } = this.state;

        // const isLoggedIn = Auth().isAuthenticated();
        // const is_current_user_profile = isLoggedIn ? Auth().paraseJwt().sub.user.id === profile.id : false;
        // const is_current_user_profile = true;

        if(editMode) {
            return (
                <ProfileEditContent
                    user={user}
                    showSnackbar={this.props.showSnackbar}
                    updateUser={this.props.updateUser}
                    setBannerUrl={this.props.setBannerUrl}
                    setBanner={this.props.setBanner}
                    deleteBanner={this.props.deleteBanner}
                    closeEdit={() => this.closeEdit()} 
                />
            );
        } else {
            return <ProfileInfoContent getCurrentUser={this.props.getCurrentUser} showSnackbar={this.props.showSnackbar} openEdit={() => this.openEdit()} user={user} />
        }
    }
}
    

export default withStyles(styles)(ProfileContent);