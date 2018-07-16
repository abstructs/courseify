import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Auth from './Auth';
import { Grid, Paper, withStyles, Typography, TextField, FormControl, Button, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import SimpleSnackbar from './Helpers/SimpleSnackbar';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
});


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            username: "",
            errors: {},
            redirect: false
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const payload = {
            user: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        }
        
        axios.post("/api/v1/users/", payload)
        .then(res => Auth().authenticate(payload.user))
        .then(_ => this.setState({redirect: true}))
        .catch(err => {
            const { errors } = err.response.data;
            console.log(errors)
            this.setState({ errors }, 
                this.showSnackbar("Something went wrong, double check those fields!", "error"));
        });
    }

    shouldMarkError(paramName) {
        const errors = this.state.errors[paramName] || [];
        return errors.length != 0;
    }

    showSnackbar = (message, variant) => {
        this.snackbar.handleClick(message, variant);
        // this.setState({ snackbarClicked: true, message });
    }

    render() {
        const { redirect, errors } = this.state;
        const { classes } = this.props;

        const shouldMarkError = {
            email: this.shouldMarkError("email"),
            username: this.shouldMarkError("username"),
            password: this.shouldMarkError("password"),
            password_confirmation: this.shouldMarkError("password_confirmation")
        }

        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div className={classes.root}>
                <SimpleSnackbar onRef={ref => this.snackbar = ref} message={this.state.message} />
                <Grid container spacing={24}>
                    <Grid item xs={12} align="center">
                        <Typography align="center" style={{color: "black", marginTop: "50px", marginBottom: "20px"}} variant="display2">
                            Sign Up
                        </Typography>
                        <Typography align="center" variant="subheading">
                            Already have an account? Click <a href="/login">here</a> to login!
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl error={shouldMarkError.email} margin="normal" fullWidth>
                            <TextField error={shouldMarkError.email} value={this.state.email} name="email" onChange={this.handleInputChange.bind(this)} fullWidth={true} className={classes.textField} label="Email" type="email" placeholder="Email"></TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.email ? errors.email[0] : ""}</FormHelperText>
                        </FormControl>
                        <FormControl error={shouldMarkError.username} margin="normal" fullWidth>
                            <TextField error={shouldMarkError.username} value={this.state.username} name="username" onChange={this.handleInputChange.bind(this)} fullWidth={true} className={classes.textField} label="Username" type="text" placeholder="Username"></TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.username ? errors.username[0] : ""}</FormHelperText>
                        </FormControl>
                        <FormControl error={shouldMarkError.password} margin="normal" fullWidth>
                            <TextField error={shouldMarkError.password} value={this.state.password} name="password" onChange={this.handleInputChange.bind(this)} fullWidth className={classes.textField} label="Password" type="password" placeholder="Password"></TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.password ? errors.password[0] : ""}</FormHelperText>
                        </FormControl>
                        <FormControl error={shouldMarkError.password_confirmation} margin="normal" fullWidth>
                            <TextField error={shouldMarkError.password_confirmation} value={this.state.password_confirmation} name="password_confirmation" onChange={this.handleInputChange.bind(this)} className={classes.textField} label="Password Confirmation" type="password" placeholder="Password Confirmation"></TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.password_confirmation ? errors.password_confirmation[0] : ""}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Button onClick={this.handleSubmit.bind(this)} style={{margin: "auto", marginTop: "30px"}} variant="contained" size="large" color="primary" className={classes.button}>
                        Sign Up
                    </Button>
                </Grid>
        </div>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);