import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import { Grid, Paper, withStyles, Card, CardMedia, CardContent, Typography, CardActions, Button, BottomNavigation, BottomNavigationAction, AppBar, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Divider, TextField, FormControl } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Create';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import bookImage from '../images/book.jpeg';
import PropTypes from 'prop-types';
// import Profile from './ProfileContainer';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
// import $ from 'jquery';
// import swal from 'sweetalert';

{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

const styles = theme => ({
    root: {
        display: 'flex',
        // flexWrap: 'wrap',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
        textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "25%",
    },
    media: {
        height: "250px",
        // paddingTop: '56.25%', // 16:9
        // paddingTop: '30%', // 16:9
        // height: "200px"
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit
    }
});

// TODO: Change ProfileEdit to handle it's own state
class ProfileEditContent extends Component {
    constructor(props) {
        super(props);       
        
        this.state = {
            profile: props.profile
        }

    }

    handleCancel(e) {
        console.log('cancel')
        this.props.toggleEdit();
    }

    handleSave(event) {
        axios.put("http://localhost:3000/api/v1/users/" + this.state.profile.id, this.state.profile)
        .then(res => 
            console.log('success')
            // swal({
            //     title: "Success",
            //     text: "The new profile is looking sexy ;)!",
            //     icon: "success"
            // })
        )
        .then(_ => this.props.toggleEdit())
        .catch(err => {
            console.log('error')
            // swal({
            //     title: "Something went wrong!",
            //     // text: "Please check the error messages!",
            //     text: "Todo: error message here",
            //     icon: "error",
            //     dangerMode: true
            //     // text: err.response.data
            // })
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            // ...prevState,
            profile: {
                ...prevState.profile,
                [name]: value
            }
        })); 
    }

    render() {
        const { classes, toggleEdit } = this.props;
        const { profile } = this.state;

        return (
            <div className={classes.root} noValidate autoComplete="off">
                {/* <CardMedia
                className={classes.media}
                image={bookImage}
                title="Contemplative Reptile"
                /> */}
                <CardContent>
                    <FormControl className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        value={this.state.profile.first_name}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        value={this.state.profile.last_name}
                        />
                    </FormControl>
                    {/* <Button onClick={toggleEdit} style={{float: "right", marginTop: "-43px", marginRight: "30px"}} variant="fab" color="secondary" aria-label="add" className={classes.button}>
                        <EditIcon />
                    </Button> */}
                    <FormControl className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="country"
                        label="Country"
                        name="country"
                        value={this.state.profile.country}
                        margin="normal"
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="headline"
                        label="Headline"
                        name="headline"
                        value={this.state.profile.headline}
                        fullWidth={true}
                        margin="normal"
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="summary"
                        label="Summary"
                        name="summary"
                        multiline
                        fullWidth
                        value={this.state.profile.summary}
                        margin="normal"
                        />
                    </FormControl>
                    <Button onClick={this.handleSave.bind(this)} variant="contained" color="primary" className={classes.button}>
                        Save
                    </Button>
                    <Button onClick={this.handleCancel.bind(this)} variant="contained" color="secondary" className={classes.button}>
                        Cancel
                    </Button>
                </CardContent>
            </div>
        );
    }
}

        // return (
        //     <div className="">
        //         <form>
        //             <div className="form-row mb-4">
        //                 <div className="col-md-4">
        //                     <label for="first_name">First name</label>
        //                     <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.first_name} type="text" className="form-control" name="first_name" placeholder="First Name" required />
        //                 </div>
                            
        //                 <div className="col-md-4">
        //                     <label for="last_name">Last Name</label>
        //                     <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.last_name} type="text" className="form-control" name="last_name" placeholder="Last Name" required />
        //                 </div>

        //                 <div className="col-md-4">
        //                     <label for="headline">Headline</label>
        //                     <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.headline} type="text" className="form-control" name="headline" placeholder="Job Title" required />
        //                 </div> 
        //             </div>

        //             <div className="form-row mb-4">
        //                 <div className="col-md-6">
        //                     <label for="country">Country</label>
        //                     <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.country} type="text" className="form-control" name="country" placeholder="Country" required />
        //                 </div>
                                
        //                 <div className="col-md-6">
        //                     <label for="education">Education</label>
        //                     <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.education} type="text" className="form-control" name="education" placeholder="Education" required />
        //                 </div>
        //             </div>

        //             <div className="form-row mb-4">
        //                 <div className="col-md-12">
        //                     <label for="industry">Industry</label>
        //                     <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.industry} type="text" className="form-control" name="industry" placeholder="Industry" required />
        //                 </div>
        //             </div>

        //             <div className="form-row mb-4">
        //                 <div className="col-md-12">
        //                     <label for="summary">Summary</label>
        //                     <textarea onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.summary} className="form-control" name="summary" placeholder="Summary" required />
        //                 </div>
        //             </div>
        //         </form>
        //     </div>
        // );

ProfileEditContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileEditContent);