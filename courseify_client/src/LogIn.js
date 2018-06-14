import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import { Redirect } from 'react-router';
import Auth from './Auth';
import PropTypes from 'prop-types';
// import Alert from './Alert';
import { Grid, Paper, withStyles, Typography, TextField, FormControl, Button } from '@material-ui/core';

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
            errors: {
                emailErrors: [],
                passwordErrors: []
            },
            messages: [],
            redirect: false
        }
    }

    componentDidMount() {
        // console.log(this.state)
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

        // console.log(this.state)
    }

    handleSubmit(event) {
        const req = {
            // "auth": {
                "email": this.state.email,
                "password": this.state.password
            // }
        }
    
        Auth().authenticate(req)
        .then(res => {
            const jwt = res.data.jwt;
            localStorage.setItem("token", jwt);
            
            this.setState({
                redirect: true
            });
        })
        .catch(err => {
            console.log(err.response.data);
            // const errors = err.response.data.errors;
            // const emailErrors = errors.email || [];
            // const passwordErrors = errors.password || [];
            // console.log(emailErrors)
            this.setState({
                messages: err.response.data.messages
                // errors: {
                //     emailErrors,
                //     passwordErrors
                // }
            })
        });
    }

    render() {
        const { classes } = this.props;
        const { redirect } = this.state;
        
        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
        <div className={classes.root}>
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