import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { CardHeader, CardActions, Collapse, Card, Button, IconButton, Avatar, Dialog, DialogTitle, DialogActions, LinearProgress } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleIcon from '@material-ui/icons/SupervisorAccount';
import CourseEditContent from './CourseEditContent';
import PropTypes from 'prop-types';
import CourseInfoContent from './CourseInfoContent';

class CourseCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialog_open: false,
            expanded: false,
            edit: false,
            refreshing: false,
            deleted: false,
            course: props.course
        }
    }

    handleEditExpand(e) {
        this.setState({ expanded: !this.state.expanded });
    }

    handleDeleteClick(e) {
        this.setState({ dialog_open: true });
    }

    handleDelete(e) {
        axios.delete(`http://localhost:3000/api/v1/courses/${this.state.course.id}`)
        .then(res => {
            this.setState({ refreshing: true, dialog_open: false }, _ => setTimeout(_ => {
                this.setState({ deleted: true })
                this.props.showSnackbar("Successfully deleted course", "success")();
            }, 1000));
        });
    }

    handleCancel(e) {
        this.setState({ dialog_open: false }, _ => this.handleCloseDialog());
    }

    handleCloseDialog() {
        this.setState({ dialog_open: false });
    }

    handleOpenDialog(e) {
        this.setState({ dialog_open: true });
    }

    refresh() {
        axios.get(`http://localhost:3000/api/v1/courses/${this.state.course.id}`)
        .then(res => {
            const course = JSON.parse(res.data.course);
            this.setState({ course, refreshing: false });
        })
    }

    handleRecommendClick() {
        axios.post('http://localhost:3000/api/v1/recommendations', { course_id: this.state.course.id })
        .then(res => {
            console.log('recommend')
            this.setState({ current_user_recommended: true, refreshing: true }, _ => setTimeout(_ => { 
                this.refresh();
                this.props.showSnackbar("Successfully recommended course", "success")();
            }, 500));
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleUnrecommendClick() {
        axios.delete('http://localhost:3000/api/v1/recommendations', { course_id: this.state.course.id })
        .then(res => {
            this.setState({ current_user_recommended: false, refreshing: true }, _ => setTimeout(_ => {
                this.refresh();
                this.props.showSnackbar("Successfully unrecommended course", "success")();
            }, 500));
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleEditCallback() {
        this.setState({ expanded: false, refreshing: true }, _ => setTimeout(_ => {
            this.refresh();
            this.props.showSnackbar("Course succesfully edited", "success")();
        }, 1000));
    }

    handleShowRecommendation() {

    }
 
    render() {
        const { classes, current_user } = this.props;
        const { course, refreshing, deleted } = this.state;

        const current_user_recommended = this.state.course.recommendations.filter(recommendation => {
            return recommendation.user_id == this.props.current_user.id
        }).length != 0;
        
        if(deleted) {
            return (
                <div>
                </div>
            );
        }

        return (
            <Card className={classes.card}>
                {/* <SimpleSnackbar message={"hi"} /> */}
                <Dialog open={this.state.dialog_open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to remove this course?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleDelete.bind(this)} color="primary" autoFocus>
                            Yes, remove it
                        </Button>
                        <Button onClick={this.handleCancel.bind(this)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <CardHeader
                    // style={{paddingBottom: "0px"}}
                    avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        <DoneIcon color="primary" />
                    </Avatar>}
                    // }
                    // action={
                    // <IconButton>
                    //     <MoreVertIcon />
                    // </IconButton>
                    // }
                    title={`${course.title}`}
                    subheader={`by ${course.author}`}
                />

                <CourseInfoContent classes={classes} course={course} />

                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton color={current_user_recommended ? "secondary" : "default"} 
                    onClick={current_user_recommended ? this.handleUnrecommendClick.bind(this) : this.handleRecommendClick.bind(this)} 
                    aria-label="Recommend this course"
                    disabled={refreshing}>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton disabled={refreshing} aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton disabled={refreshing} onClick={this.handleShowRecommendation.bind(this)}  aria-label="Delete">
                        <PeopleIcon />
                    </IconButton>
                    {
                        current_user.id === course.user_id && 
                        <div>
                            <IconButton disabled={refreshing} onClick={this.handleEditExpand.bind(this)} aria-label="Edit">
                                <EditIcon color={this.state.expanded ? "secondary" : "inherit"} disabled={refreshing} />
                            </IconButton>
                            <IconButton disabled={refreshing} onClick={this.handleDeleteClick.bind(this)}  aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    }

                </CardActions>
                {refreshing && <LinearProgress />}

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CourseEditContent handleEditCallback={this.handleEditCallback.bind(this)} handleEditExpand={this.handleEditExpand.bind(this)} classes={classes} course={course} />
                </Collapse>
            </Card>
        );
    }
}

CourseCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default CourseCard;