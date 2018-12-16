/* tslint:disable */

import * as React from 'react';

// import { CardHeader, CardActions, Collapse, Card, Button, IconButton, Avatar, Dialog, DialogTitle, DialogActions, LinearProgress, DialogContent, TextField, DialogContentText, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleIcon from '@material-ui/icons/SupervisorAccount';
// import CourseEditContent from './CourseEditContent';

import CourseInfoContent from './CourseInfoContent';

// import RecommendationDialog from '../Recommendation/RecommendationDialog';
import { ICourse } from 'src/Services/CourseService';
// Collapse
import { Card, Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText, TextField, CardHeader, Avatar, CardActions, withStyles, IconButton } from '@material-ui/core';
// import { PropTypes } from '@material-ui/core';

const styles = {
    card: {
        // maxWidth: 800,
        marginBottom: "40px"
    },
    actions: {
        display: 'flex',
    },
    avatar: {
    //   backgroundColor: red[500],
    }
}

interface IPropTypes {
    course: ICourse,
    classes: {
        card: string,
        avatar: string,
        actions: string
    }
}

interface IStateTypes {
    course: ICourse,
    deleteDialogOpen: boolean,
    edit: boolean,
    loading: boolean,
    expanded: boolean,
    deleted: boolean,
    openRecommendations: boolean,
    openShare: boolean
}

class CourseCard extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            deleteDialogOpen: false,
            expanded: false,
            edit: false,
            loading: false,
            deleted: false,
            course: props.course,
            openRecommendations: false,
            openShare: false
        }
    }

    expandEdit() {
        this.setState({ expanded: !this.state.expanded });
    }

    openDeleteDialog() {
        this.setState({ deleteDialogOpen: true });
    }

    deleteCourse() {
        console.log("delete")
        // axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/courses/${this.state.course.id}`)
        // .then(res => {
        //     this.setState({ refreshing: true, deleteDialogOpen: false }, _ => setTimeout(_ => {
        //         this.setState({ deleted: true })
        //         this.props.showSnackbar("Successfully deleted course", "success");
        //     }, 1000));
        // });
    }

    handleCancel() {
        this.setState({ deleteDialogOpen: false }, () => this.handleCloseDialog());
    }

    handleCloseDialog() {
        this.setState({ deleteDialogOpen: false });
    }

    handleOpenDialog() {
        this.setState({ deleteDialogOpen: true });
    }

    refresh() {
        console.log("refresh")
        // axios.get(`${process.env.REACT_APP_API_URL}/api/v1/courses/${this.state.course.id}`)
        // .then(res => {
        //     const { course } = res.data;
        //     this.setState({ course, refreshing: false });
        // })
    }

    handleRecommendClick() {
        console.log("recommend")
        // axios.post('${process.env.REACT_APP_API_URL}/api/v1/recommendations', { course_id: this.state.course.id })
        // .then(res => {
        //     console.log('recommend')
        //     this.setState({ current_user_recommended: true, refreshing: true }, _ => setTimeout(_ => { 
        //         this.refresh();
        //         this.props.showSnackbar("Successfully recommended course", "success");
        //     }, 500));
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }

    handleUnrecommendClick() {
        console.log("unrecommend")
        // axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/recommendations`, { course_id: this.state.course.id })
        // .then(res => {
        //     this.setState({ current_user_recommended: false, refreshing: true }, _ => setTimeout(_ => {
        //         this.refresh();
        //         this.props.showSnackbar("Successfully unrecommended course", "success");
        //     }, 500));
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }

    handleEditLoading() {
        console.log("edit loading")
        // this.setState({ expanded: false, refreshing: true }, _ => setTimeout(1000));
    }

    handleEditSuccess() {
        console.log("valid")
        // this.setState({ expanded: false, refreshing: true }, _ => setTimeout(_ => {
        //     this.refresh();
        //     this.props.showSnackbar("Course succesfully edited", "success");
        // }, 1000));
    }

    handleEditError() {
        console.log("Errors")
        // this.setState({ expanded: true, refreshing: false }, _ => {
        //     this.props.showSnackbar("Something went wrong, double check your work!", "error");
        // });
    }

    openRecommendationsDialog() {
        this.setState({ openRecommendations: true });
    }

    closeRecommendationsDialog() {
        this.setState({ openRecommendations: false });
    }

    openShareDialog() {
        this.setState({ openShare: true });
    }

    closeShareDialog() {
        this.setState({ openShare: false });
    }
    // handleShareFocus(event) {
    //     event.target.select();
    // }

    handleCopy() {
        const copied = document.execCommand('copy');

        if(copied) {
            this.closeShareDialog();
        }
    }

    // setImageUrl(new_url) {
    //     console.log("set url called")
    //     this.setState(prevState => ({
    //         // ...prevState,
    //         course: {
    //             ...prevState.course,
    //             image_url: new_url
    //         }
    //     })); 
    // }
 
    render() {
        const { classes } = this.props;
        const { course, deleted } = this.state;
        // const isLoggedIn = Auth().isAuthenticated();

        // const current_user_recommended = this.state.course.recommendations.filter(recommendation => {
        //     return recommendation.user_id == this.props.current_user.id;
        // }).length != 0;
        
        if(deleted) {
            return (
                <div>
                </div>
            );
        }

        return (
            <Card className={classes.card}>
                {/* <SimpleSnackbar message={"hi"} /> */}
                {/* <RecommendationDialog recommendations={course.recommendations} onClose={this.handleRecommendationsClose.bind(this)} course_id={course.id} open={this.state.openRecommendations} /> */}
                <Dialog open={this.state.deleteDialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to remove this course?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.deleteCourse()} color="primary" autoFocus>
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
                        value={`/courses/${course.id}`}
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

                <CourseInfoContent course={course} />

                <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton color={true ? "secondary" : "default"} 
                        // onClick={true ? this.handleUnrecommendClick.bind(this) : this.handleRecommendClick.bind(this)} 
                        aria-label="Recommend this course"
                        //disabled={refreshing}
                        >
                            <FavoriteIcon />
                        </IconButton>
                        {/*  */}
                    <IconButton onClick={() => this.openShareDialog()} aria-label="Share">
                        <ShareIcon color={this.state.openShare ? "secondary" : "inherit"}  />
                    </IconButton>
                    <IconButton onClick={() => this.openRecommendationsDialog()}  aria-label="Delete">
                        <PeopleIcon color={this.state.openRecommendations ? "secondary" : "inherit"} />
                    </IconButton>
                    {
                        // current_user.id === course.user_id &&   
                        <div>
                            <IconButton onClick={() => this.expandEdit()} aria-label="Edit">
                                <EditIcon color={this.state.expanded ? "secondary" : "inherit"} />
                            </IconButton>
                            <IconButton onClick={() => this.openDeleteDialog()}  aria-label="Delete">
                                <DeleteIcon color={this.state.deleteDialogOpen ? "secondary" : "inherit"} />
                            </IconButton>
                        </div>
                    }

                </CardActions>
                {/* {refreshing && <LinearProgress />} */}

                {/* <Collapse in={this.state.expanded} timeout="auto"> */}
                    {/* setImageUrl={this.setImageUrl.bind(this)}  */}
                    {/* <CourseEditContent handleEditError={this.handleEditError.bind(this)} handleEditLoading={this.handleEditLoading.bind(this)} handleEditSuccess={this.handleEditSuccess.bind(this)} handleEditExpand={this.handleEditExpand.bind(this)} classes={classes} course={course} /> */}
                {/* </Collapse> */}
            </Card>
        );
    }
}

export default withStyles(styles)(CourseCard);