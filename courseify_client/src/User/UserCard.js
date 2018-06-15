
import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { withStyles, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    //   width: '100%',
    //   maxWidth: 360,
    //   backgroundColor: theme.palette.background.paper,
    },
});

class UserCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        const { classes } = this.props;

        return (
            <Card style={{margin: "50px"}} className={classes.card}>
                <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {user.first_name} {user.last_name} 
                </Typography>
                <Typography gutterBottom variant="subheading">
                    is a {user.headline} from {user.country}
                </Typography>
                <Typography gutterBottom variant="body2">
                    Summary
                </Typography>
                <Typography component="body1">
                    {user.summary}
                </Typography>
                </CardContent>
                <CardActions>
                    <Button href={`/people/${user.id}`} size="small" color="primary">
                        Check Out Their Profile
                    </Button>
                    {/* <Button size="small" color="primary">
                        Message
                    </Button> */}
                </CardActions>
            </Card>
        );
    }
}

UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);