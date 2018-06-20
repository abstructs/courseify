import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import PropTypes from 'prop-types';
import { Grid, List, ListItem, ListItemText, Divider, ListSubheader, Typography, withStyles, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, CircularProgress, Fade, Snackbar, Icon, SnackbarContent } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import green from '@material-ui/core/colors/green';
import CourseCard from './CourseCard';
import CourseAddExpansion from './CourseAddExpansion';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';

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
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
})

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class CourseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            expanded: false,
            loading: true,
            message_info: {}
        }
    }

    queue = [];

    showSnackbar = (message, variant) => _ => {
        this.queue.push({
            message,
            key: new Date().getTime(),
            variant
        });

        if(this.state.open) {
            this.setState({ open: false });
        }
        else {
            this.processQueue();
        }
    }

    processQueue() {
        if(this.queue.length > 0) {
            this.setState({
                message_info: this.queue.shift(),
                open: true
            })
        }
    }

    handleSnackbarClose = (event, reason) => {
        if(reason === 'clickaway') return;
        this.setState({ open: false });
    };

    handleSnackbarExited() {
        this.processQueue();
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

    handleCancel(e) {
        this.setState({ expanded: false });
    }

    handleExpandClick(e) {
        this.setState({ expanded: !this.state.expanded});
    }

    render() {
        // if(this.state.deleted) return <div></div>;
        const { classes, } = this.props;
        const isLoggedIn = Auth().isAuthenticated();
        const current_user = isLoggedIn ? Auth().paraseJwt().sub.user : {};
        const { loading, courses } = this.state;
        const { message, key, variant } = this.state.message_info;

        const Icon = variantIcon[variant];

        // onClick={this.handleDropdown.bind(this)} 
        return (
            <div className={classes.root}>
                {/* <Button onClick={this.handleSnackbarClick("hello").bind(this)}>Hello</Button> */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    onExited={this.handleSnackbarExited.bind(this)}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleSnackbarClose.bind(this)}
                    // ContentProps={{
                    //     'aria-describedby': 'message-id',
                    // }}
                >
                    <SnackbarContent
                        key={key}
                        className={classNames(classes[variant])}
                        message={
                            <span id="message-id">
                                <Icon className={classNames(classes.icon, classes.iconVariant)} />
                                {message}
                            </span>}
                        action={[
                            // <Button key="undo" color="secondary" size="small" onClick={this.handleClose.bind(this)}>
                            //   UNDO
                            // </Button>,
                        <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleSnackbarClose.bind(this)}>
                            <CloseIcon />
                        </IconButton>
                    ]}
                    />
                </Snackbar>
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
                                
                                <Typography variant="display1" align="left" style={{marginTop: "50px"}} color="textSecondary">
                                    Courses
                                </Typography>
                                <Typography variant="caption" align="left" style={{marginTop: "5px"}} color="textSecondary">
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
                                    return <CourseCard key={course.id} showSnackbar={this.showSnackbar.bind(this)} current_user={current_user} classes={classes} course={course} />
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

CourseContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseContainer);