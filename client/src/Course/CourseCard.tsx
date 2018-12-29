import * as React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';

import CourseInfoContent from './CourseInfoContent';

import { ICourse, IEditCourseForm, IImage, CourseService } from 'src/Services/CourseService';

import { Card, Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText, TextField, CardHeader, Avatar, CardActions, withStyles, IconButton, Collapse, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import CourseEditContent from './CourseEditExpansion';
import { ICurrentUser } from 'src/Services/UserService';
import { Variant } from 'src/Helpers/AppSnackbar';
import { blue } from '@material-ui/core/colors';

const styles = {
    card: {
        marginBottom: "40px"
    },
    actions: {
        display: 'flex',
    },
    userAvatar: {
        backgroundColor: blue[100],
        color: blue[600],
    }
}

interface IPropTypes {
    course: ICourse,
    currentUser: ICurrentUser | null,
    showSnackbar: (message: string, variant: Variant) => void,
    // unrecommendCourse: (courseId: number, onSuccess: () => void, onError: () => void) => void,
    // recommendCourse: (courseId: number, onSuccess: () => void, onError: () => void) => void,
    // updateCourse: (form: IEditCourseForm, onSuccess: () => void, onError: () => void) => void,
    // deleteCourse: (courseId: number, onSuccess: () => void, onError: () => void) => void,
    // deleteImage: (courseId: number, onSuccess: () => void, onError: () => void) => void,
    // getCourse: (courseId: number, onSuccess: (course: ICourse) => void, onError: () => void) => void,
    classes: {
        card: string,
        avatar: string,
        userAvatar: string,
        actions: string
    }
}

interface IStateTypes {
    course: ICourse,
    deleteDialogOpen: boolean,
    edit: boolean,
    loading: boolean,
    editFormExpanded: boolean,
    deleted: boolean,
    openRecommendations: boolean,
    openShare: boolean
}

const defaultImageState: IImage = {
    fileName: "",
    imageUrl: "",
    file: null
}

class CourseCard extends React.Component<IPropTypes, IStateTypes> {

    private courseService: CourseService;
    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            deleteDialogOpen: false,
            editFormExpanded: false,
            edit: false,
            loading: false,
            deleted: false,
            course: props.course,
            openRecommendations: false,
            openShare: false
        }

        this.courseService = new CourseService();
    }

    getCourse(courseId: number, onSuccess: (course: ICourse) => void, onError: () => void) {
        this.courseService.getOne(courseId, onSuccess, onError);
    }

    recommendCourse(courseId: number, onSuccess: () => void, onError: () => void) {
        this.courseService.recommendCourse(courseId, onSuccess, onError);
    }

    unrecommendCourse(courseId: number, onSuccess: () => void, onError: () => void) {
        this.courseService.unrecommendCourse(courseId, onSuccess, onError);
    }

    updateCourse(form: IEditCourseForm, onSuccess: (course: IEditCourseForm) => void, onError: () => void) {
        this.courseService.updateCourse(form, onSuccess, onError);
    }

    deleteCourse(courseId: number, onSuccess: () => void, onError: () => void) {
        this.courseService.deleteCourse(courseId, onSuccess, onError);
    }

    deleteImage(courseId: number, onSuccess: () => void, onError: () => void) {
        this.courseService.deleteCourseImage(courseId, onSuccess, onError);
    }

    expandEditForm() {
        this.setState({ editFormExpanded: true });
    }

    toggleEditFormExpand() {
        this.setState({ editFormExpanded: !this.state.editFormExpanded });
    }

    closeEditForm() {
        this.setState({ 
            editFormExpanded: false
        });
    }

    openDeleteDialog() {
        this.setState({ deleteDialogOpen: true });
    }

    handleDelete() {
        this.deleteCourse(this.state.course.id, () => {
            this.setState({ deleted: true });
            this.props.showSnackbar("Course has been deleted", Variant.Success);
        }, () => {
            this.props.showSnackbar("Something went wrong", Variant.Error);
        });
    }

    handleDeleteCancel() {
        this.setState({ deleteDialogOpen: false });
    }

    handleEditCancel() {
        console.log("Cancel edit")

        this.setState({
            course: {
                ...this.props.course,
                image: defaultImageState
            }
        }, this.closeEditForm);
    }

    handleOpenDialog() {
        this.setState({ deleteDialogOpen: true });
    }

    refresh() {
        this.getCourse(this.state.course.id, (course: ICourse) => {
            this.setState({
                course: {
                    ...course
                }
            })
        }, () => {

        });
    }

    openRecommendationsDialog() {
        this.setState({ openRecommendations: true });
    }

    closeRecommendationsDialog() {
        this.setState({ openRecommendations: false });
    }
    
    setImageUrl(image_url: string | null) {
        this.setState({
            course: {
                ...this.state.course,
                image_url
            }
        });
    }

    setImage(file: File | null) {
        
        this.setState({
            course: {
                ...this.state.course,
                image: {
                    imageUrl: file ? URL.createObjectURL(file) : "",
                    fileName: file ? file.name : "",
                    file
                }
            }
        });
    }

    openShareDialog() {
        this.setState({ openShare: true });
    }

    closeShareDialog() {
        this.setState({ openShare: false });
    }

    handleCopy() {
        const copied = document.execCommand('copy');

        if(copied) {
            this.closeShareDialog();
        }
    }

    onEditSuccess(form: IEditCourseForm) {
        this.setState({
            course: { 
                ...this.state.course,
                ...form
            }
        }, this.closeEditForm);
    }

    handleRecommend() {
        if(this.state.course.current_user_recommended) {
            this.unrecommendCourse(this.state.course.id, () => this.refresh(), () => this.refresh());
        } else {
            this.recommendCourse(this.state.course.id, () => this.refresh(), () => this.refresh());
        }
    }
 
    render() {
        const { classes, currentUser } = this.props;
        const { course, deleted, editFormExpanded, deleteDialogOpen, openShare, openRecommendations } = this.state;

        if(deleted) {
            return (
                <div>
                </div>
            );
        }

        return (
            <Card className={classes.card}>
                <Dialog onClose={() => this.closeRecommendationsDialog()} open={openRecommendations}>
                    <DialogTitle id="simple-dialog-title">People Who Recommended This Course</DialogTitle>
                    <div>
                        <List>
                        {course.recommenders.map((recommender, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar className={`${classes.userAvatar}`}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={recommender.user.username} />
                                <Button href={`/profile/${recommender.user.username}`}>View Profile</Button>
                            </ListItem>
                        ))}
                        </List>
                    </div>
                </Dialog>

                <Dialog open={deleteDialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to remove this course?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.handleDelete()} color="primary" autoFocus>
                            Yes, remove it
                        </Button>
                        <Button onClick={() => this.handleDeleteCancel()}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    style={{minWidth: "400px"}}
                    open={openShare}
                    onClose={() => this.closeShareDialog()}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Share this course with a friend</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Copy the link below
                        </DialogContentText>
                        <TextField
                            autoFocus
                            // onFocus={() => this.handleShareFocus()}
                            margin="normal"
                            id="link"
                            value={`http://localhost:3000/courses/${course.id}`}
                            label="Copy Link"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.closeShareDialog()} color="primary">
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
                    title={`${course.title} - (${course.category.split("_").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")})`}
                    subheader={`by ${course.author}`}
                />

                <CourseInfoContent course={this.state.course} />

                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton color={course.current_user_recommended ? "secondary" : "default"} 
                        onClick={() => this.handleRecommend()}
                        aria-label="Recommend this course"
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton onClick={() => this.openShareDialog()} aria-label="Share">
                        <ShareIcon color={openShare ? "secondary" : "inherit"} />
                    </IconButton>
                    <IconButton onClick={() => this.openRecommendationsDialog()}  aria-label="Delete">
                        <PeopleIcon color={this.state.openRecommendations ? "secondary" : "inherit"} />
                    </IconButton>
                    {
                        currentUser && currentUser.id === course.user_id &&   
                        <div>
                            <IconButton onClick={() => this.toggleEditFormExpand()} aria-label="Edit">
                                <EditIcon color={editFormExpanded ? "secondary" : "inherit"} />
                            </IconButton>
                            <IconButton onClick={() => this.openDeleteDialog()}  aria-label="Delete">
                                <DeleteIcon color={deleteDialogOpen ? "secondary" : "inherit"} />
                            </IconButton>
                        </div>
                    }
                </CardActions>

                <Collapse in={editFormExpanded} timeout="auto">
                    <CourseEditContent setImageUrl={(image_url: string) => this.setImageUrl(image_url)} deleteImage={this.deleteImage.bind(this)} setImage={(file: File) => this.setImage(file)} showSnackbar={this.props.showSnackbar} onSuccess={(newCourse: IEditCourseForm) => this.onEditSuccess(newCourse)} updateCourse={this.updateCourse.bind(this)} handleCancel={() => this.handleEditCancel()}  course={course} />
                </Collapse>
            </Card>
        );
    }
}

export default withStyles(styles)(CourseCard);