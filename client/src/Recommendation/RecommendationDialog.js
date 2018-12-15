import React, { Component } from 'react';
import Auth from '../User/Auth';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

class RecommendationDialog extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
        }        
    }

    componentDidMount() {
    }

    handleListItemClick(recommendation) {
        // console.log(recommendation.user.id)
    }

    render() {
        const { classes, open, onClose } = this.props;

        console.log(this.props.recommendations)

        return (
            <Dialog onClose={onClose} open={open}>
                <DialogTitle id="simple-dialog-title">People Who Recommended This Course</DialogTitle>
                <div>
                    <List>
                    {this.props.recommendations.map(recommendation => (
                        <ListItem key={recommendation.id}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={recommendation.user.username} />
                            <Button href={`/people/${recommendation.user.username}`}>View Profile</Button>
                        </ListItem>
                    ))}
                    {/* <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
                        <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="add account" />
                    </ListItem> */}
                    </List>
                </div>
            </Dialog>
        )
    }
}

RecommendationDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    course_id: PropTypes.number.isRequired,
    // handleRecommendationsClose: PropTypes.func.isRequired
};

export default withStyles(styles)(RecommendationDialog);