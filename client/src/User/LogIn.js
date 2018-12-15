import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import { Redirect } from 'react-router';
import Auth from './Auth';
import PropTypes from 'prop-types';
// import Alert from './Alert';
import { Grid, withStyles, Typography, TextField, FormControl, Button, FormHelperText } from '@material-ui/core';
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
  

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
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

    formIsValid() {
        const { email, password } = this.state;
        
        const validEmail = email.length() > 0;
        const validPassword = password.length() >= 6 && password.length() <= 20;
        
        return validEmail && validPassword;
    }

    handleSubmit(event) {
        const req = {
            "email": this.state.email,
            "password": this.state.password
        }

        if(!this.formIsValid()) {
            this.setState({ errors },
                this.showSnackbar("We couldn't log you in, are you missing something?", "error"));
        } else {
            Auth().authenticate(req)
            .then(res => {
                this.setState({ redirect: true });
            })
            .catch(err => {
                this.showSnackbar("Something went wrong.", "error");
            });
        }
    }

    showSnackbar = (message, variant) => {
        this.snackbar.handleClick(message, variant);
        // this.setState({ snackbarClicked: true, message });
    }

    shouldMarkError(paramName) {
        const errors = this.state.errors[paramName] || [];
        return errors.length != 0;
    }

    render() {
        const { classes } = this.props;
        const { redirect, errors } = this.state;
        const shouldMarkError = {
            email: this.shouldMarkError("email"),
            password: this.shouldMarkError("password")
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
                        Login
                    </Typography>
                    <Typography align="center" variant="subheading">
                        No Account yet? Click <a href="/signup">here</a> to sign up!
                    </Typography>
                    {/* <Paper>
                        Login
                    </Paper> */}
                </Grid>
                <Grid item xs={12} align="center">
                    {/* <Paper align="center"> */}
                        <FormControl error={shouldMarkError.email} margin="normal" fullWidth>
                            <TextField error={shouldMarkError.email} name="email" onChange={this.handleInputChange.bind(this)} fullWidth={true} className={classes.textField} label="Email" type="email" placeholder="Email"></TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.email ? errors.email[0] : ""}</FormHelperText>
                        </FormControl>
                        {/* <FormControl>
                            <TextField className={classes.textField} label="Email" type="text" placeholder="Email"></TextField>
                        </FormControl>
                        <br/> */}
                        <FormControl error={shouldMarkError.password} margin="normal" fullWidth>
                            <TextField error={shouldMarkError.password} name="password" onChange={this.handleInputChange.bind(this)} fullWidth className={classes.textField} label="Password" type="password" placeholder="Password"></TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.password ? errors.password[0] : ""}</FormHelperText>
                        </FormControl>
                        {/* <FormControl>
                            <TextField className={classes.textField} label="Password Confirmation" type="password" placeholder="Password Confirmation"></TextField>
                        </FormControl> */}
                    {/* </Paper> */}
                </Grid>
                <Button onClick={this.handleSubmit.bind(this)} style={{margin: "auto", marginTop: "30px"}} variant="contained" size="large" color="primary" className={classes.button}>
                    Login
                </Button>
            </Grid>

            {/* {this.state.messages.map(message => {
                return <Alert message={message} />;
            })} */}
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
            {/* <br/>
            <h1 className="text-center text-dark">Log In</h1>
            <p className="text-center">This is the cool kids club! Not a <a href="/signup">member</a>?</p>
            <div className="pt-2">
                <form>
                    <div className="form-group col-md-6 m-auto">
                        <label className="text-dark" htmlFor="email">Email</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="email" name="email" />
                        <br/>
                        <label className="text-dark" htmlFor="password">Password</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="password" name="password" />
                        <button onClick={this.handleSubmit.bind(this)} className="btn mt-3 pr-5 pl-5 text-white" style={{backgroundColor: "#ff6000"}} type="button">Get In</button>
                    </div>
                </form>
            </div> */}
        </div>
        );
    }
}

LogIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogIn);