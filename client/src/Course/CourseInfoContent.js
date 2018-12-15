/* tslint:disable */

import React, { Component } from 'react';
import '../App.css';
import bookImage from '../images/book.jpeg';
import { CardMedia, CardContent, Typography, Button, withStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PropTypes from 'prop-types';

const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

class CourseInfoContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { course } = this.props;

        console.log(course)

        return (
            <div>
                <CardMedia
                    className={classes.media}
                    image={course.image_url ? course.image_url : bookImage}
                    title="Books"
                />
                <CardContent>
                    <Typography component="p" style={{marginBottom: "20px"}} gutterBottom> 
                        {course.description}
                    </Typography>
                    <Button target="_blank" href={`http://${course.url}`} variant="contained" color="primary" style={{float: "right"}}>
                        <AddCircleIcon style={{marginRight: "10px"}} />
                        Take Course
                    </Button>
                    
                    <Typography style={{paddingTop: "10px", marginBottom: "20px"}} color="textSecondary" component="subheading" gutterBottom>
                        {course.recommendations.length} {course.recommendations.length == 1 ? ` person recommends this` : ` people recommend this`}
                    </Typography>
                </CardContent>
            </div>
        );
    }
}

CourseInfoContent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseInfoContent);