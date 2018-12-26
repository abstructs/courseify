/* tslint:disable */

import * as React from 'react';
import { CardMedia, CardContent, Typography, Button, withStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ICourse } from 'src/Services/CourseService';

const bookImage = require('../images/book.jpeg');

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}

interface IPropTypes {
    course: ICourse,
    classes: {
        media: string
    }
}

class CourseInfoContent extends React.Component<IPropTypes, {}> {
    constructor(props: IPropTypes) {
        super(props);
    }

    render() {
        const { course, classes } = this.props;

        return (
            <div>
                <CardMedia
                    className={classes.media}
                    image={course.image && course.image.file && course.image.imageUrl || course.image_url || bookImage}
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
                    
                    {/* <Typography style={{paddingTop: "10px", marginBottom: "20px"}} color="textSecondary" gutterBottom>
                        {course.recommendations.length} {course.recommendations.length == 1 ? ` person recommends this` : ` people recommend this`}
                    </Typography> */}
                </CardContent>
            </div>
        );
    }
}

export default withStyles(styles)(CourseInfoContent);