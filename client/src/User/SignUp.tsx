import * as React from 'react';
import '../App.css';
import { Redirect } from 'react-router';
import { Grid, withStyles, Typography, TextField, FormControl, Button, Theme, createStyles, FormHelperText } from '@material-ui/core';

import { SignupValidator, ISignupFormErrors } from 'src/Validators/User/SignupValidator';
import { ISignupForm, UserService } from 'src/Services/UserService';
// import SimpleSnackbar from '../Helpers/SimpleSnackbar';

const styles = ({ spacing, palette }: Theme) => createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
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
    formControl: {
        width: "40%"
    }
});

interface IPropTypes {
    classes: {
        textField: string,
        root: string,
        button: string,
        formControl: string
    }
}

interface IStateTypes {
    form: ISignupForm,
    errors: ISignupFormErrors,
    redirect: boolean
}

class SignUp extends React.Component<IPropTypes, IStateTypes> {

    private signupValidator: SignupValidator;
    private userService: UserService;

    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            form: {
                email: "",
                username: "",
                password: "",
                password_confirmation: "",
            },
            errors: {
                email: [],
                username: [],
                password: []
            },
            redirect: false
        }

        this.signupValidator = new SignupValidator(() => this.state.form);
        this.userService = new UserService();
    }

    handleInputChange({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = currentTarget;

        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    setErrors(callback: () => void): void {
        const getEmailErrors = new Promise<Array<String>>((resolve, reject) => this.signupValidator.getAsyncEmailError((emailErrors: Array<String>) => {
            resolve(emailErrors);
        }));

        const getUsernameErrors = new Promise<Array<String>>((resolve, reject) => this.signupValidator.getAsyncUsernameError((usernameErrors: Array<String>) => {
            resolve(usernameErrors);
        }));

        const errors = this.signupValidator.getErrors();

        Promise.all([getEmailErrors, getUsernameErrors])
        .then(([emailErrors, usernameErrors]) => {
            this.setState({
                errors: {
                    ...errors,
                    email: [
                        ...emailErrors,
                        ...errors.email
                    ],
                    username: [
                        ...usernameErrors,
                        ...errors.username
                    ]
                }
            }, callback);
        });
    }

    getFieldsWithErrors(): Array<String> {
        return Object.keys(this.state.errors).filter(key => this.state.errors[key].length > 0);
    }

    thereAreNoErrors(): boolean {
        return this.getFieldsWithErrors().length == 0;
    }

    onSuccess() {
        this.setState({
            redirect: true
        });
    }

    onError() {
        console.error("Something went wrong");
    }

    handleSubmit() {
        this.setErrors(() => {
            if(this.thereAreNoErrors()) {
                this.userService.signup(this.state.form, this.onSuccess.bind(this), this.onError);
            }
        });
    }

    // showSnackbar = (message, variant) => {
    //     this.snackbar.handleClick(message, variant);
    //     // this.setState({ snackbarClicked: true, message });
    // }

    render() {
        const { redirect, errors } = this.state;
        const { classes } = this.props;

        const { username, email, password, password_confirmation } = this.state.form;

        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div className={classes.root}>
                {/* <SimpleSnackbar onRef={(ref: React.Ref<HTMLElement>) => this.snackbar = ref} message={this.state.message} /> */}

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography align="center" style={{marginTop: "50px", marginBottom: "20px"}} variant="display2">
                            Sign Up
                        </Typography>
                        <Typography align="center" variant="subheading">
                            Already have an account? Click <a href="/login">here</a> to login!
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={24} alignItems="center" justify="center">
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        <FormControl error={true} margin="normal" fullWidth>
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
                        <FormControl error={errors.password.length > 0} margin="normal" fullWidth>
                            <TextField error={errors.password.length > 0} value={password_confirmation} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} 
                                name="password_confirmation" fullWidth className={classes.textField} label="Password Confirmation" type="password" placeholder="Password Confirmation"/>
                            <FormHelperText className={classes.textField}>{errors.password.length > 0 ? errors.password[0] : ""}</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item xs={3}/>
                    <Button onClick={() => this.handleSubmit()} style={{margin: "auto", marginTop: "30px"}} variant="contained" size="large" color="primary" className={classes.button}>
                        Sign Up
                    </Button>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(SignUp);