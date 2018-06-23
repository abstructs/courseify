import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { CardHeader, CardActions, Collapse, Card, Button, IconButton, Avatar, Dialog, DialogTitle, DialogActions, LinearProgress, DialogContent, TextField, DialogContentText } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleIcon from '@material-ui/icons/SupervisorAccount';
import CourseEditContent from './CourseEditContent';
import PropTypes from 'prop-types';
import CourseInfoContent from './CourseInfoContent';
import RecommendationDialog from '../Recommendation/RecommendationDialog';

class CourseCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteDialogOpen: false,
            expanded: false,
            edit: false,
            refreshing: false,
            deleted: false,
            course: props.course,
            openRecommendations: false,
            openShare: false
        }
    }

    handleEditExpand(e) {
        this.setState({ expanded: !this.state.expanded });
    }

    handleDeleteClick(e) {
        this.setState({ deleteDialogOpen: true });
    }

    handleDelete(e) {
        axios.delete(`http://localhost:3000/api/v1/courses/${this.state.course.id}`)
        .then(res => {
            this.setState({ refreshing: true, deleteDialogOpen: false }, _ => setTimeout(_ => {
                this.setState({ deleted: true })
                this.props.showSnackbar("Successfully deleted course", "success");
            }, 1000));
        });
    }

    handleCancel(e) {
        this.setState({ deleteDialogOpen: false }, _ => this.handleCloseDialog());
    }

    handleCloseDialog() {
        this.setState({ deleteDialogOpen: false });
    }

    handleOpenDialog(e) {
        this.setState({ deleteDialogOpen: true });
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
                this.props.showSnackbar("Successfully recommended course", "success");
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
                this.props.showSnackbar("Successfully unrecommended course", "success");
            }, 500));
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleEditCallback() {
        this.setState({ expanded: false, refreshing: true }, _ => setTimeout(_ => {
            this.refresh();
            this.props.showSnackbar("Course succesfully edited", "success");
        }, 1000));
    }

    handleShowRecommendations() {
        this.setState({ openRecommendations: true });

    }

    handleRecommendationsClose() {
        this.setState({ openRecommendations: false });
    }

    handleShowShare() {
        this.setState({ openShare: true });
    }

    handleShareClose() {
        this.setState({ openShare: false });
    }
    handleShareFocus(event) {
        event.target.select();
    }

    handleCopy() {
        const copied = document.execCommand('copy');
        if(copied) {
            this.props.showSnackbar("Copied to clipboard", "success");
        }
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
                <RecommendationDialog recommendations={course.recommendations} onClose={this.handleRecommendationsClose.bind(this)} course_id={course.id} open={this.state.openRecommendations} />
                <Dialog open={this.state.deleteDialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
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
                <Dialog
                    style={{minWidth: "400px"}}
                    open={this.state.openShare}
                    // onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Share this course with a friend</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Copy the link below
                        </DialogContentText>
                        <TextField
                        autoFocus
                        onFocus={this.handleShareFocus.bind(this)}
                        margin="normal"
                        id="link"
                        value="http://localhost:3001/courses"
                        label="Copy Link"
                        type="text"
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleShareClose.bind(this)} color="primary">
                            Close
                        </Button>
                        <Button onClick={this.handleCopy.bind(this)} color="primary">
                            Copy Link
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
                    <IconButton onClick={this.handleShowShare.bind(this)} disabled={refreshing} aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton disabled={refreshing} onClick={this.handleShowRecommendations.bind(this)}  aria-label="Delete">
                        <PeopleIcon color={this.state.openRecommendations ? "secondary" : "inherit"} />
                    </IconButton>
                    {
                        current_user.id === course.user_id && 
                        <div>
                            <IconButton disabled={refreshing} onClick={this.handleEditExpand.bind(this)} aria-label="Edit">
                                <EditIcon color={this.state.expanded ? "secondary" : "inherit"} disabled={refreshing} />
                            </IconButton>
                            <IconButton disabled={refreshing} onClick={this.handleDeleteClick.bind(this)}  aria-label="Delete">
                                <DeleteIcon color={this.state.deleteDialogOpen ? "secondary" : "inherit"} />
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