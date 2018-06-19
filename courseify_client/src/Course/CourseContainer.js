import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
import $ from 'jquery';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import bookImage from '../images/book.jpeg';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Divider, ListSubheader, CardHeader, CardMedia, CardContent, Typography, CardActions, Collapse, Card, withStyles, Button, IconButton, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper, Input, FormControl, TextField, CircularProgress, Dialog, DialogTitle, DialogActions, Fade, LinearProgress } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DoneIcon from '@material-ui/icons/Done';
import classNames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import green from '@material-ui/core/colors/green';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import SimpleSnackbar from '../Helpers/SimpleSnackbar';


axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    progress: {
        margin: theme.spacing.unit * 2
    },
    card: {
        // maxWidth: 800,
        marginBottom: "40px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 200,  
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        color: "",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    // expand: {
    //   transform: 'rotate(0deg)',
    //   transition: theme.transitions.create('transform', {
    //     duration: theme.transitions.duration.shortest,
    //   }),
    //   marginLeft: 'auto',
    // },
    // expandOpen: {
    //   transform: 'rotate(180deg)',
    // },
    avatar: {
    //   backgroundColor: red[500],
    },
  });

class CourseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            expanded: false,
            loading: true
        }
    }

    componentWillMount() {
        setTimeout(_ => {
            axios.get('http://localhost:3000/api/v1/courses')
            .then(res => {
                const courses = JSON.parse(res.data.courses);
                
                this.setState({ courses, loading: false });
            });
        }, 1000);
    }

    handleCourseChange(event) {  
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    // handleUpdate(e) {
    //     const new_data = {
    //         title: this.state.title,
    //         author: this.state.author,
    //         description: this.state.description,
    //         url: this.state.url
    //     }
        
    //     axios.put(`http://localhost:3000/api/v1/recommendations/${this.state.id}`, new_data)
    //     .then(res => this.setState({ ...new_data }))
    //     .then(_ => 
    //         swal({
    //                 title: "Success",
    //                 text: "Update totally went through :)",
    //                 icon: "success",
    //                 timer: 3000
    //         })
    //     )
    //     .then(_ => $(`#recommendation-modal-${this.state.id}`).modal('hide'));
    //     // e.preventDefault();
    //     // e.stopPropagation();
    //     // console.log("update")
    //     // return false;
    // }

    handleCancel(e) {
        this.setState({ expanded: false });
    }

    handleExpandClick(e) {
        this.setState({ expanded: !this.state.expanded});
    }

    // handleDelete(e) {
    //     swal({
    //         title: "Are you sure?",
    //         text: "Once it's gone... It's gone.",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true
    //     })
    //     .then(willDelete => {
    //         if(willDelete) {
    //             axios.delete(`http://localhost:3000/api/v1/recommendations/${this.state.id}`)
    //             .then(res => {
    //                 swal("Poof! It's been deleted", {
    //                     icon: "success",
    //                 })
    //                 .then(_ => $(`#recommendation-modal-${this.state.id}`).modal('hide'))
    //                 .then(_ => { 
    //                     this.props.incrementRecommendations(-1);
    //                     this.setState({ deleted: true });
    //                 })
    //                 .catch(err => console.error(err.response.data) /* handle err */);
    //             })
    //         } else { 
    //             swal("It's all good, it's safe!");
    //         }
    //     })
    //     console.log("run")

    // }

    render() {
        // if(this.state.deleted) return <div></div>;
        const { classes } = this.props;
        const isLoggedIn = Auth().isAuthenticated();
        const current_user = isLoggedIn ? Auth().paraseJwt().sub.user : {};
        const { loading, courses } = this.state;

        // onClick={this.handleDropdown.bind(this)} 
        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify="space-between">
                    <Grid item md={3}>
                        <List component="nav" subheader={<ListSubheader component="div">Categories</ListSubheader>}>
                            <Divider />
                            <ListItem button>
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Computer Science" />
                            </ListItem>
                            <ListItem button >
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Data Science" />
                            </ListItem>
                            <ListItem button >
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Engineering" />
                            </ListItem>
                            <ListItem button >
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Social Sciences" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={40}>
                            <Grid item xs={12}>
                                <Typography variant="display1" align="left" style={{marginTop: "50px"}} color="text-secondary">
                                    Courses
                                </Typography>
                                <Typography variant="caption" align="left" style={{marginTop: "5px"}} color="text-secondary">
                                    See what people are recommending.
                                </Typography>
                                <Fade in={!this.state.expanded}>
                                    <Button onClick={this.handleExpandClick.bind(this)} disabled={this.state.expanded} color="primary" style={{float: "right"}}>Add A Course</Button>
                                </Fade>
                            </Grid>
                            <Grid item xs={12}>
                                <CourseAddExpansion handleCancel={this.handleCancel.bind(this)} classes={classes} expanded={this.state.expanded} />
                            </Grid>
                        </Grid>
                        {loading ?
                                <Grid container spacing={0} justify="center">
                                    <CircularProgress />
                                </Grid>
                            :
                                this.state.courses.map(course => {
                                    return <CourseCard key={course.id} current_user={current_user} classes={classes} course={course} />
                                })
                        }
                    </Grid>
                    <Grid item xs={2} style={{width: "100%"}}>

                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Top Authors</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Top People</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel disabled>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Top Courses</Typography>
                            </ExpansionPanelSummary>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

class CourseAddExpansion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {
                title: "",
                author: "",
                url: "",
                description: ""
            },
            loading: false,
            success: false,
            dialog_open: false
        }
    }

    clearState() {
        this.setState({
            course: {
                title: "",
                author: "",
                url: "",
                description: ""
            },
            loading: false,
            success: false,
            dialog_open: false
        })
    }

    componentWillUnmount() {
        this.clearState();
    }

    handleCourseAdd(e) {
        const { course, loading, success } = this.state;

        if(!loading && !success) {
            this.setState({
                loading: true, 
                success: false,
                error: false
            }, 
            _ => {
                new Promise(resolve => {
                    setTimeout(_ => {
                        axios.post(`http://localhost:3000/api/v1/courses`, { ...course })
                        .then(res => {
                            this.setState({ loading: false, success: true }, resolve);
                        })
                        .catch(err => {
                            this.setState(
                                { loading: false, success: false, error: true }, 
                                _ => new Error());
                        })
                    }, 1000)
                })
                .then(_ => {
                    setTimeout(_ => {
                        this.props.handleCancel();
                    }, 1000);
                })
                .catch(err => {
                    console.log(err)
                })
            });
        }
    }

    handleCourseChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            // ...prevState,
            course: {
                ...prevState.course,
                [name]: value
            }
        })); 
    }

    handleCancel(e) {
        this.setState({ dialog_open: false }, _ => this.props.handleCancel());
    }

    handleCloseDialog() {
        this.setState({ dialog_open: false });
    }

    handleOpenDialog(e) {
        this.setState({ dialog_open: true });
    }

    render() {

        const { classes, expanded } = this.props;
        const { course, loading, success } = this.state;
        const addBtnClassName = classNames({
            [classes.buttonSuccess]: success
        });

        return (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {/* <Dialog open={this.state.dialog_open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"If you do that your changes won't be saved"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog.bind(this)} color="primary" autoFocus>
                            Keep Changes
                        </Button>
                        <Button onClick={this.handleCancel.bind(this)} color="secondary">
                            Cancel
                        </Button>

                    </DialogActions>
                </Dialog> */}
                <Card style={{margin: "3px", marginBottom: "40px"}} className={classes.card}>
                    {/* <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    /> */}
                    <CardContent>
                        <Typography variant="display1" color="text-secondary">
                            Add A Course
                        </Typography>
                        <TextField value={course.title} onChange={this.handleCourseChange.bind(this)} name="title" className={classes.textField} label="Title" type="text" placeholder="Title"></TextField>
                        <TextField value={course.author} onChange={this.handleCourseChange.bind(this)} name="author" className={classes.textField} label="Author" type="text" placeholder="Author"></TextField>

                        {/* <FormControl fullWidth margin="normal"> */}
                        <TextField value={course.url}  onChange={this.handleCourseChange.bind(this)} name="url" className={classes.textField} label="Link" type="url" placeholder="http://"></TextField>

                        <FormControl margin="normal" fullWidth>
                            <TextField
                            value={course.description} 
                            onChange={this.handleCourseChange.bind(this)}
                            label="Description" 
                            name="description"
                            className={classes.textField}
                            multiline
                            fullWidth
                            // value={this.state.profile.summary}
                            margin="normal"
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                    <div className={classes.wrapper}>
                        <Button className={addBtnClassName} variant="contained" disabled={loading} onClick={this.handleCourseAdd.bind(this)} size="small" color="primary">
                            Add Course
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    <Button onClick={this.props.handleCancel.bind(this)} size="small" color="primary">
                        Cancel
                    </Button>
                    </CardActions>
                </Card>
            </Collapse>
        );
    }
}

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
                this.setState({ deleted: true})
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
            const { course } = res.data;
            this.setState({ course, refreshing: false });
            
        })
    }

    handleRecommendClick() {
        axios.post('http://localhost:3000/api/v1/recommendations', { course_id: this.state.course.id })
        .then(res => {
            console.log("success")
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleEditCallback() {
        this.setState({ expanded: false, refreshing: true }, _ => setTimeout(_ => {
            this.refresh();
        }, 1000));
    }

    render() {

        const { classes, current_user } = this.props;
        const { course, refreshing, deleted } = this.state;

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
                    <IconButton onClick={this.handleRecommendClick.bind(this)} aria-label="Recommend this course">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    {
                        current_user.id === course.user_id && 
                        <div>
                            <IconButton onClick={this.handleEditExpand.bind(this)} aria-label="Edit">
                                <EditIcon color={this.state.expanded ? 'secondary' : ''} />
                            </IconButton>
                            <IconButton onClick={this.handleDeleteClick.bind(this)}  aria-label="Delete">
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

class CourseInfoContent extends Component {
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
                    {/* {/* <Typography style={{paddingTop: "10px", marginBottom: "20px"}} color="textSecondary" component="subheading" gutterBottom> */}
                        {/* // 27 people recommend this */}
                    {/* // </Typography> */}
                </CardContent>
            </div>
        );
    }
}

class CourseEditContent extends Component {
    constructor(props) {
        super(props);

        // console.log(props)

        this.state = {
            ...props.course
        }

        
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSave(e) {
        axios.put(`http://localhost:3000/api/v1/courses/${this.state.id}`, { ... this.state })
        .then(res => {
            
            this.props.handleEditCallback();
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleCancel(event) {
        this.props.handleEditExpand();
    }

    render() {
        const { classes } = this.props;

        return (
            <CardContent>
                <FormControl className={classes.formControl}>
                    <TextField
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="title"
                    name="title"
                    label="Title"
                    value={this.state.title}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="author"
                    name="author"
                    label="Author"
                    value={this.state.author}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="url"
                    id="url"
                    label="Link"
                    name="url"
                    value={this.state.url}
                    margin="normal"
                    />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <TextField
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="description"
                    label="Description"
                    name="description"
                    value={this.state.description}
                    margin="normal"
                    multiline
                    />
                </FormControl>
                <div style={{marginTop: "20px"}}>
                    <Button onClick={this.handleSave.bind(this)} variant="contained" color="primary" className={classes.button}>Save</Button>
                    <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
                </div>
            </CardContent>
        );
    }
}

CourseContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseContainer);