import * as React from 'react';
import '../App.css';
import { Redirect } from 'react-router';
import { Grid, withStyles, Typography, TextField, FormControl, Button, FormHelperText, Theme, createStyles } from '@material-ui/core';
// import SimpleSnackbar from '../Helpers/SimpleSnackbar';
import { ILoginForm, UserService } from 'src/Services/UserService';
import { ILoginFormErrors, LoginValidator } from 'src/Validators/User/LoginValidator';
import AppSnackbar, { Variant } from 'src/Helpers/AppSnackbar';
// import { SnackbarClassKey } from '@material-ui/core/Snackbar';

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
        root: string,
        textField: string,
        button: string
    }
}

interface IStateTypes {
    form: ILoginForm,
    errors: ILoginFormErrors,
    redirect: boolean
}

class Login extends React.Component<IPropTypes, IStateTypes> {
    
    private loginValidator: LoginValidator;
    private userService: UserService; 
    private showSnackbar: (message: string, variant: Variant) => void;

    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            form: {
                email: "",
                password: ""
            },
            errors: {
                email: [],
                password: []
            },
            redirect: false
        }

        // this.snackbar = React.createRef();

        this.loginValidator = new LoginValidator(() => this.state.form);
        this.userService = new UserService();

        // this.snackbar
    }

    componentDidMount() {
        // this.snackbar    
    }

    handleInputChange({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = currentTarget;

        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    setErrors(callback: () => void): void {
        this.setState({
            errors: this.loginValidator.getErrors()
        }, callback);
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
                this.userService.authenticate(this.state.form, this.onSuccess.bind(this), this.onError);
            } else {
                this.showSnackbar("Invalid credentials", Variant.Error);
            }
        });
    }

    setShowSnackbar(openSnackbar: (message: string, variant: string) => void) {
        this.showSnackbar = openSnackbar;
    }

    // showSnackbar = (message, variant) => {
    //     this.snackbar.handleClick(message, variant);
    //     // this.setState({ snackbarClicked: true, message });
    // }

    render() {
        const { classes } = this.props;
        const { redirect, errors } = this.state;
        
        if(redirect) {
            return <Redirect to='/' />;
        }

        return (
        <div className={classes.root}>
         {/* message={this.state.message}  */}
         {/* onRef={(ref: AppSnackBar) => this.snackbar = ref} */}
            <AppSnackbar setOpenSnackbar={this.setShowSnackbar.bind(this)} />
            <Grid container spacing={24}>
                <Grid item xs={12}>
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
                <Grid item xs={3} />
                <Grid item xs={6}>
                    {/* <Paper align="center"> */}
                        <FormControl error={errors.email.length > 0} margin="normal" fullWidth>
                            <TextField error={errors.email.length > 0} name="email" onChange={this.handleInputChange.bind(this)} fullWidth={true} className={classes.textField} label="Email" type="email" placeholder="Email"></TextField>
                            <FormHelperText className={classes.textField}>{errors.email.length > 0 ? errors.email[0] : ""}</FormHelperText>
                        </FormControl>
                        {/* <FormControl>
                            <TextField className={classes.textField} label="Email" type="text" placeholder="Email"></TextField>
                        </FormControl>
                        <br/> */}
                        <FormControl error={errors.password.length > 0} margin="normal" fullWidth>
                            <TextField error={errors.password.length > 0} name="password" onChange={this.handleInputChange.bind(this)} fullWidth className={classes.textField} label="Password" type="password" placeholder="Password"></TextField>
                            <FormHelperText className={classes.textField}>{errors.password.length > 0 ? errors.password[0] : ""}</FormHelperText>
                        </FormControl>
                        {/* <FormControl>
                            <TextField className={classes.textField} label="Password Confirmation" type="password" placeholder="Password Confirmation"></TextField>
                        </FormControl> */}
                    {/* </Paper> */}
                </Grid>
                <Grid item xs={3} />
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

export default withStyles(styles)(Login);