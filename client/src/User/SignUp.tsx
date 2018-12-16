import * as React from 'react';
import '../App.css';
// import axios from 'axios';
import { Redirect } from 'react-router';
// import Auth from './Auth';
import { Grid, withStyles, Typography, TextField, FormControl, Button, Theme, createStyles, FormHelperText } from '@material-ui/core';

import { UserValidator } from 'src/Validators/UserValidator';
// import SimpleSnackbar from '../Helpers/SimpleSnackbar';

const styles = ({ spacing, palette }: Theme) => createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: spacing.unit * 2,
      textAlign: 'center',
      color: palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: spacing.unit,
        marginRight: spacing.unit
    },
});

interface IPropTypes {
    classes: {
        textField: string,
        root: string,
        button: string
    }
}

export interface IUserForm {
    email: string,
    username: string,
    password: string,
    passwordConfirmation: string
}

export interface IUserFormErrors {
    email: Array<String>,
    username: Array<String>,
    password: Array<String>,
    passwordConfirmation: Array<String>
}

interface IStateTypes {
    form: IUserForm,
    errors: IUserFormErrors,
    redirect: boolean
}

class SignUp extends React.Component<IPropTypes, IStateTypes> {

    private userValidator: UserValidator;

    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            form: {
                email: "",
                username: "",
                password: "",
                passwordConfirmation: "",
            },
            errors: {
                email: [],
                username: [],
                password: [],
                passwordConfirmation: []
            },
            redirect: false
        }

        this.userValidator = new UserValidator(this.state.form);
    }

    handleInputChange({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = currentTarget;

        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    setErrors(): void {
        this.setState({
            errors: this.userValidator.getErrors()
        });
    }

    thereAreNoErrors(): boolean {
        const fieldsWithErrors = Object.keys(this.state.errors).filter(key => this.state.errors[key].length > 0 );

        return fieldsWithErrors.length > 0;
    }

    handleSubmit(event: React.MouseEvent<HTMLElement>) {
        this.setErrors();

        if(this.thereAreNoErrors()) {
            // todo: query service here
            this.setState({
                redirect: true
            })
        }
        // const userPayload = { user: this.state.form };
        
        // axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/`, payload)
        // .then(res => Auth().authenticate(payload.user))
        // .then(_ => this.setState({redirect: true}))
        // .catch(err => {
        //     const { errors } = err.response.data;
        //     console.log(errors)
        //     // this.setState({ errors }, 
        //     //     this.showSnackbar("Something went wrong, double check those fields!", "error"));
        // });
    }

    // shouldMarkError(paramName) {
    //     const errors = this.state.errors[paramName] || [];
    //     return errors.length != 0;
    // }

    // showSnackbar = (message, variant) => {
    //     this.snackbar.handleClick(message, variant);
    //     // this.setState({ snackbarClicked: true, message });
    // }

    render() {
        const { redirect, errors } = this.state;
        const { classes } = this.props;

        const { username, email, password, passwordConfirmation } = this.state.form;

        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div className={classes.root}>
                {/* <SimpleSnackbar onRef={ref => this.snackbar = ref} message={this.state.message} /> */}

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography align="center" style={{color: "black", marginTop: "50px", marginBottom: "20px"}} variant="display2">
                            Sign Up
                        </Typography>
                        <Typography align="center" variant="subheading">
                            Already have an account? Click <a href="/login">here</a> to login!
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={24} direction="column" alignItems="center" justify="center">
                    <Grid item xs={12}>

                        <FormControl error={errors.email.length > 0} margin="normal" fullWidth>
                            <TextField error={errors.email.length > 0} value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} 
                                name="email" fullWidth={true} className={classes.textField} label="Email" type="email" placeholder="Email"/>
                            <FormHelperText className={classes.textField}>{errors.email.length > 0 ? errors.email[0] : ""}</FormHelperText>
                        </FormControl>
                        <FormControl error={errors.username.length > 0} margin="normal" fullWidth>
                            <TextField error={errors.username.length > 0} value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} 
                                name="username" fullWidth={true} className={classes.textField} label="Username" type="text" placeholder="Username"/>
                            <FormHelperText className={classes.textField}>{errors.username.length > 0 ? errors.username[0] : ""}</FormHelperText>
                        </FormControl>
                        <FormControl error={errors.password.length > 0} margin="normal" fullWidth>
                            <TextField error={errors.password.length > 0} value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} 
                                name="password" fullWidth className={classes.textField} label="Password" type="password" placeholder="Password"/>
                            <FormHelperText className={classes.textField}>{errors.password.length > 0 ? errors.password[0] : ""}</FormHelperText>
                        </FormControl>
                        <FormControl error={errors.passwordConfirmation.length > 0 || errors.password.length > 0} margin="normal" fullWidth>
                            <TextField error={errors.passwordConfirmation.length > 0 || errors.password.length > 0} value={passwordConfirmation} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} 
                                name="passwordConfirmation" fullWidth className={classes.textField} label="Password Confirmation" type="password" placeholder="Password Confirmation"/>
                            <FormHelperText className={classes.textField}>{errors.passwordConfirmation.length > 0 ? errors.passwordConfirmation[0] : ""}</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Button onClick={(e) => this.handleSubmit(e)} style={{margin: "auto", marginTop: "30px"}} variant="contained" size="large" color="primary" className={classes.button}>
                        Sign Up
                    </Button>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(SignUp);