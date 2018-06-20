import React, { Component } from 'react';
import '../App.css';
import bookImage from '../images/book.jpeg';
import { CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PropTypes from 'prop-types';

class CourseInfoContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { course } = this.props;

        return (
            <div>
                <CardMedia
                    className={classes.media}
                    image={bookImage}
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

export default CourseInfoContent;