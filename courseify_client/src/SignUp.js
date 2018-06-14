import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Auth from './Auth';
import Alert from './Alert';
import { Grid, Paper, withStyles, Typography, TextField, FormControl, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

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
            passwordConfirmation: "",
            errors: {
                emailErrors: [],
                passwordErrors: []
            },
            messages: [],
            redirect: false
        }
    }

    componentDidMount() {
        console.log(this.state)
        // axios.get("http://localhost:3000/api/v1/videos.json")
        // .then(response => {
        //     console.log(response)
        //     this.setState({videos: response.data})
        // }).catch(error => console.log(error));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        console.log(this.state)
    }

    handleSubmit(event) {
        const payload = {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.passwordConfirmation
            }
        }
        
        axios.post("http://localhost:3000/api/v1/users/", payload)
        // .then(res => Auth().authenticate(payload.user))
        // .then(res => localStorage.setItem('token', res.data.jwt))
        // .then(res => this.setState({redirect: true}))
        .catch(err => {
            const messages = err.response.data.messages;
            // const errors = err.response.data.errors;
            // const emailErrors = errors.email || [];
            // const passwordErrors = errors.password || [];
            // console.log(err.response);
            // console.log(emailErrors)
            this.setState({
                // errors: {
                //     emailErrors,
                //     passwordErrors
                // },
                messages
            })
        });
    }

    render() {
        const { redirect } = this.state;
        const { classes } = this.props;

        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div className={classes.root}>
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
                        {/* <Paper align="center"> */}
                            <FormControl margin="normal" fullWidth>
                                <TextField name="email" onChange={this.handleInputChange.bind(this)} fullWidth={true} className={classes.textField} label="Email" type="email" placeholder="Email"></TextField>
                            </FormControl>
                            {/* <FormControl>
                                <TextField className={classes.textField} label="Email" type="text" placeholder="Email"></TextField>
                            </FormControl>
                            <br/> */}
                            <FormControl margin="normal" fullWidth>
                                <TextField name="password" onChange={this.handleInputChange.bind(this)} fullWidth className={classes.textField} label="Password" type="password" placeholder="Password"></TextField>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <TextField name="passwordConfirmation" className={classes.textField} label="Password Confirmation" type="password" placeholder="Password Confirmation"></TextField>
                            </FormControl>
                        {/* </Paper> */}
                    </Grid>
                    <Button onClick={this.handleSubmit.bind(this)} style={{margin: "auto", marginTop: "30px"}} variant="contained" size="large" color="primary" className={classes.button}>
                        Sign Up
                    </Button>
                </Grid>
            {/* {this.state.errors.emailErrors.map(errMsg => {
                return (
                    <div className="alert alert-danger m-0 border-0" role="alert">
                        {"Email " + errMsg}
                    </div>
            )})}
            {this.state.errors.passwordErrors.map(errMsg => {
                    return (
                        <div className="alert alert-danger m-0 border-0" role="alert">
                            {"Password " + errMsg}
                        </div>
                    );
            })} */}
            {/* {this.state.messages.map(message => {
                return <Alert message={message} />;
            })}*/}
        </div>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);