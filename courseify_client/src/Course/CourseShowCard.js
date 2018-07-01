import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import PropTypes from 'prop-types';
import { Grid, List, ListItem, ListItemText, Divider, ListSubheader, Typography, withStyles, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, CircularProgress, Fade, Snackbar, Icon, SnackbarContent } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/green';
import CourseCard from './CourseCard';
import CourseAddExpansion from './CourseAddExpansion';
import RecommendationDialog from '../Recommendation/RecommendationDialog';
import classNames from 'classnames';
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
        minWidth: 200,  
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
    },
    buttonError: {
        backgroundColor: theme.palette.error.dark,
        // '&:hover': {
        //   backgroundColor: red[222],
        // },
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
    }
});

// const tabs = {
//     all: { id: 1, value: "all" },
//     computer_science: { id: 2, value: "computer_science" },
//     data_science: {id: 3, value: "data_science"}
// }

class CourseShowCard extends Component {
    constructor(props) {
        super(props);
        // this.snackbar = React.createRef();

        // this.state = {
        //     courses: [],
        //     expanded: false,
        //     loading: true,
        //     recommendationsOpen: false,
        //     tab: 1
        // }        
    }

    // componentDidMount() {
    //     this.getCourses();
    // }

    // getAllCourses() {
    //     setTimeout(_ => {
    //         axios.get('http://localhost:3000/api/v1/courses')
    //         .then(res => {
    //             const courses = JSON.parse(res.data.courses);
                
    //             this.setState({ courses, loading: false });
    //         });
    //     }, 1000);
    // }

    // handleCourseChange(event) {  
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState({[name]: value});
    // }

    // handleCourseAddSuccess() {
    //     this.setState({ expanded: false, loading: true }, _ => this.getCourses());
    // }

    // handleCancel(e) {
    //     this.setState({ expanded: false });
    // }

    // handleExpandClick(e) {
    //     this.setState({ expanded: !this.state.expanded});
    // }

    // showSnackbar = (message, variant) => {
    //     this.snackbar.handleClick(message, variant);
    //     // this.setState({ snackbarClicked: true, message });
    // }
    
    // getCourses() {
    //     const category = tabs[Object.keys(tabs).filter(key => tabs[key].id === this.state.tab)].value;

    //     setTimeout(_ => {
    //         axios.get(`http://localhost:3000/api/v1/courses?category=${category}`)
    //         .then(res => {
    //             const courses = JSON.parse(res.data.courses);
                
    //             this.setState({ courses, loading: false });
    //         });
    //     }, 1000);
    // }

    // handleTab = tab => _ => {
    //     this.setState({ tab: tab.id, loading: true }, _ => this.getCourses());
    // } 

    render() {
        const { classes, } = this.props;
        const isLoggedIn = Auth().isAuthenticated();
        const current_user = isLoggedIn ? Auth().paraseJwt().sub.user : {};
        const { loading, courses  } = this.state;

        return (
            <div className={classes.root}>
                hi
            </div>
        );
    }
}

CourseShowCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseShowCard);