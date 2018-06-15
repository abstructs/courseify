
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

class RecommendationCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { recommendation } = this.props;
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
                    {recommendation.title} <small>by</small> {recommendation.author}
                </Typography>
                <Typography component="p">
                    {recommendation.description}
                </Typography>
                </CardContent>
                <CardActions>
                {/* <Button size="small" color="primary">
                    Share
                </Button> */}
                <Button href={recommendation.url} size="small" color="primary">
                    Learn More
                </Button>
                </CardActions>
            </Card>
        );
    }
}

RecommendationCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendationCard);