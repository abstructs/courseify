/* tslint:disable */

import * as React from 'react';
import { ICourse, CourseService } from 'src/Services/CourseService';
import CourseCard from './CourseCard';
import { ICurrentUser } from 'src/Services/UserService';
import AppSnackbar, { Variant } from 'src/Helpers/AppSnackbar';
import { Grid } from '@material-ui/core';

interface IStateTypes {
    course: ICourse | null
}

interface IPropTypes {
    classes: {
        media: string
    },
    getCurrentUser: () => ICurrentUser | null,
    match: {
        params: {
            id: number
        }
    }
}

class CourseShow extends React.Component<IPropTypes, IStateTypes> {

    private courseService: CourseService;
    private showSnackbar: (message: string, variant: string) => void;

    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            course: null
        }

        this.courseService = new CourseService();
    }

    componentDidMount() {
        const courseId = this.props.match.params.id;

        this.getCourse(courseId, (course: ICourse) => {
            this.setState({
                course
            });
        }, () => {});
    }

    getCourse(courseId: number, onSuccess: (course: ICourse) => void, onError: () => void) {
        this.courseService.getOne(courseId, onSuccess, onError);
    }

    setShowSnackbar(openSnackbar: (message: string, variant: string) => void) {
        this.showSnackbar = openSnackbar;
    }

    render() {
        // const { course, classes } = this.props;
        const { course } = this.state;
        const currentUser = this.props.getCurrentUser();

        if(course == null) {
            return <div></div>;
        }

        return (
            <div>
                <AppSnackbar setOpenSnackbar={this.setShowSnackbar.bind(this)} />
                <Grid container spacing={0} justify="space-between">
                    <Grid item md={3}>
                    </Grid>
                    <Grid style={{marginTop: 50}} item xs={6}>
                        <CourseCard showSnackbar={(message: string, variant: Variant) => this.showSnackbar(message, variant)} currentUser={currentUser} course={course} />
                    </Grid>
                    <Grid item md={3}>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CourseShow;