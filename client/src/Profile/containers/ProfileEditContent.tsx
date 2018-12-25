import * as React from 'react';
// import '../App.css';
// import { withStyles, CardContent, Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormHelperText, CircularProgress, Grid, LinearProgress, Input, Tooltip, IconButton, CardMedia, Theme } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Theme, CardMedia, CardContent, FormControl, TextField, FormHelperText, Grid, IconButton, Button, withStyles, createStyles, Tooltip } from '@material-ui/core';
import { IUser, IUserEditFormErrors, IEditUserForm } from 'src/Services/UserService';
import { UserValidator } from 'src/Validators/User/UserValidator';
import { Variant } from 'src/Helpers/AppSnackbar';
const bookImage = require('../../images/book.jpeg');

// axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

const styles = ({ spacing }: Theme) => createStyles({
    root: {
        display: 'flex',
        // flexWrap: 'wrap',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: spacing.unit,
        marginRight: spacing.unit,
        width: "25%",
        flexBasis: 200
    },
    media: {
        height: 0,
        // paddingTop: '56.25%', // 16:9
        paddingTop: '30%', // 16:9
        // maxHeight: "200px"
    },
    withoutLabel: {
        marginTop: spacing.unit * 3,
    },
    formControl: {
        margin: spacing.unit,
    },
    actionButton: {
        // margin: "20px"
        marginTop: spacing.unit,
        marginRight: spacing.unit,
        marginBottom: spacing.unit
    },
    buttonProgress: {
        color: "",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        margin: spacing.unit,
        position: 'relative',
    },
});

interface IStateTypes {
    form: IEditUserForm,
    errors: IUserEditFormErrors
}

interface IPropTypes {
    updateUser: (form: IEditUserForm, onSuccess: () => void, onError: () => void) => void,
    showSnackbar: (message: string, variant: Variant) => void,
    user: IUser,
    closeEdit: () => void,
    classes: {
        media: string,
        formControl: string,
        actionButton: string
    }
}

// TODO: Change ProfileEdit to handle it's own state
class ProfileEditContent extends React.Component<IPropTypes, IStateTypes> {

    private userValidator: UserValidator;

    constructor(props: IPropTypes) {
        super(props);           
        
        this.state = {
            form: props.user,
            errors: {
                first_name: [],
                last_name: [],
                education: [],
                headline: [],
                country: [],
                industry: [],
                summary: []
            },
            // open: false,
            // loading: false,
            // success: undefined,
            // banner: {
            //     file_name: "",
            //     url: props.profile.banner_url
            // }
        }

        this.userValidator = new UserValidator(() => this.state.form);
    }

    // handleFileChange() {
    //     if(this.upload && this.upload.files && this.upload.files.length > 0) {
    //         const file = this.upload.files[0];

    //         this.setState({
    //             form: {
    //                 ...this.state.form,
    //                 image: {
    //                     fileName: file.name,
    //                     imageUrl: URL.createObjectURL(file),
    //                     file
    //                 }
    //             }
    //         });
    //     } else {
    //         this.setState({
    //             form: {
    //                 ...this.state.form,
    //                 image: defaultImageState
    //             }
    //         });
    //     }
    // }

    handleInputChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = target;

        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    // handleClickOpen() {
    //     this.setState({ open: true });
    // }

    // handleCancel(e) {
    //     this.handleClose();
    //     this.props.toggleEdit();
    // }

    // handleSave() {
    //     const file = this.upload.files[0];
    //     var formData = new FormData();
    //     if(file) formData.append("banner", file, file.name);
        

    //     Object.keys(this.state.profile).map(key => {
    //         formData.append(key, this.state.profile[key]);
    //     });

    //     this.setState({ loading: true }, _ => {
    //         axios({
    //             method: 'put',
    //             url: `${process.env.REACT_APP_API_URL}/api/v1/users/${this.props.profile.username}`,
    //             data: formData,
    //             config: { headers: {'Content-Type': 'multipart/form-data' }}
    //             })
    //             .then(res => this.props.refreshUserInfo())
    //             .catch(err => {
    //                 console.log(err.response)
    //                 console.log("error happened line 114")
    //                 const { errors } = err.response.data;
    //                 this.setState({ errors, loading: false });
    //         });
    //     });
    // }

    // handleChange(event) {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState(prevState => ({
    //         // ...prevState,
    //         profile: {
    //             ...prevState.profile,
    //             [name]: value
    //         }
    //     })); 
    // }

    // handleClose() {
    //     this.setState({ open: false })
    // }

    // shouldMarkError(paramName) {
    //     const errors = this.state.errors[paramName] || [];
    //     return errors.length != 0;
    // }

    // handleUpload() {
    //     this.upload.click();
    // }

    // validateFile(file) {
    //     return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.name);
    // }
    
    // handleFileChange() {
    //     const uploadInput = this.upload 
    //     const file = uploadInput && uploadInput.files.length !== 0 ? uploadInput.files[0] : false;

    //     // const image = this.upload && this.upload.files.length != 0 ? URL.createObjectURL(this.upload.files[0]) : profile.banner_url;
        
    //     if(file) {
    //         if(this.validateFile(file)) {
    //             this.setState(prevState => ({
    //                 banner: {
    //                     ...prevState.banner,
    //                     file_name: file.name,
    //                     url: URL.createObjectURL(file)
    //                 }
    //             }));
    //         } else {
    //             this.setState(prevState => ({
    //                 // ...prevState,
    //                 errors: {
    //                     ...prevState.errors,
    //                     banner: [file.type + " is not a valid file format"]
    //                 }
    //             }));
    //         }
    //     }
    //     else {
    //         this.setState(prevState => ({
    //             banner: {
    //                 ...prevState.banner,
    //                 url: this.props.profile.banner_url,
    //                 file_name: ""
    //             }
    //         }));
    //     }
    // }

    getFieldsWithErrors(): Array<String> {
        return Object.keys(this.state.errors).filter(key => this.state.errors[key].length > 0);
    }

    thereAreNoErrors(): boolean {
        return this.getFieldsWithErrors().length == 0;
    }

    setErrors(callback: () => void): void {
        const errors = this.userValidator.getErrors();

        this.setState({ errors }, callback);
    }

    updateUser() {
        const user = this.state.form;

        this.props.updateUser(user, () => this.onSuccess(), () => this.onError());
    }

    onError() {
        this.props.showSnackbar("Something went wrong", Variant.Error);
    }

    onSuccess() {
        this.props.closeEdit();
        this.props.showSnackbar("Your profile has been updated", Variant.Success);
    }

    handleSubmit() {
        this.setErrors(() => {
            if(this.thereAreNoErrors()) {
                // this.setState({ loading: true }, this.updateCourse);
                this.updateUser();
            } else {
                // this.props.showSnackbar("")
                // console.log(this.state.errors);
            }
        });
    }

    handleCancel() {
        this.props.closeEdit();
    }

    render() {
        const { classes } = this.props;
        // education, industry
        const { first_name, last_name, headline, education, industry, country, summary } = this.state.form;
        // const { profile, errors, loading, success, banner } = this.state;
        const { errors } = this.state;

        // const addBtnClassName = success != undefined ? (success ? classes.buttonSuccess : classes.buttonError) : "";

        return (
            // autoComplete="off"
            <div >
                <CardMedia
                    className={classes.media}
                    image={bookImage}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <FormControl error={errors.first_name.length > 0} className={classes.formControl}>
                        <TextField
                            // onChange={this.handleChange.bind(this)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                            style={{marginLeft: "0px"}} 
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            value={first_name || ""}
                            margin="dense"
                            error={errors.first_name.length > 0}
                        />
                        <FormHelperText>{errors.first_name.length > 0 && errors.first_name[0]}</FormHelperText>
                    </FormControl>
                    <FormControl error={errors.last_name.length > 0} className={classes.formControl}>
                        <TextField
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            value={last_name || ""}
                            error={errors.last_name.length > 0}
                            margin="dense"
                        />
                        <FormHelperText>{errors.last_name.length > 0 && errors.last_name[0]}</FormHelperText>
                    </FormControl>
                    {/* <FormControl className={classes.formControl}>
                        <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                        id="username"
                        name="username"
                        label="Username"
                        value={}
                        // error={shouldMarkError.username}
                        margin="dense"
                        />
                        {/* <FormHelperText>{shouldMarkError.username ? errors.username[0] : ""}</FormHelperText> */}
                    {/* </FormControl> */}
                    {/* <Button onClick={toggleEdit} style={{float: "right", marginTop: "-43px", marginRight: "30px"}} variant="fab" color="secondary" aria-label="add" className={classes.button}>
                        <EditIcon />
                    </Button> */}
                    <FormControl error={errors.country.length > 0} className={classes.formControl}>
                        <TextField
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                            id="country"
                            label="Country"
                            name="country"
                            value={country || ""}
                            margin="dense"
                            error={errors.country.length > 0}
                        />
                        <FormHelperText>{errors.country.length > 0 && errors.country[0]}</FormHelperText>
                    </FormControl>

                    <FormControl error={errors.headline.length > 0} className={classes.formControl}>
                        <TextField
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                            id="headline"
                            label="Headline"
                            name="headline"
                            value={headline || ""}
                            fullWidth={true}
                            margin="dense"
                            error={errors.headline.length > 0}
                            // error={shouldMarkError.headline}
                        />
                        <FormHelperText>{errors.headline.length > 0 && errors.headline[0]}</FormHelperText>
                    </FormControl>

                    <FormControl error={errors.education.length > 0} className={classes.formControl}>
                        <TextField
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                            id="education"
                            label="Education"
                            name="education"
                            value={education || ""}
                            fullWidth={true}
                            margin="dense"
                            error={errors.education.length > 0}
                        />
                        <FormHelperText>{errors.education.length > 0 && errors.education[0]}</FormHelperText>
                    </FormControl>

                    <FormControl error={errors.industry.length > 0} className={classes.formControl}>
                        <TextField
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                            id="industry"
                            label="Industry"
                            name="industry"
                            value={industry || ""}
                            fullWidth={true}
                            margin="dense"
                            error={errors.industry.length > 0}
                        />
                        <FormHelperText>{errors.industry.length > 0 && errors.industry[0]}</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <Grid container spacing={0}>
                            <Grid item xl={6}>
                                {/* onChange={() => this.handleFileChange()} */}
                                {/* <input accept="image/*" type="file"  ref={(ref) => this.upload = ref} style={{ display: 'none' }} /> */}
                                {/* title={image.fileName} */}
                                <Tooltip disableHoverListener={true} title={""}>
                                    <TextField
                                        // value={image.fileName}
                                        name="image"
                                        margin="normal"
                                        // className={classes.textField}
                                        label="Image"
                                        disabled
                                        // error={errors.image.length > 0}
                                        color="primary"
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xl={2}>
                                <IconButton
                                    // style={{display: "inline"}}
                                    className="floatingButton"
                                    // onClick={() => this.handleUpload() }
                                    style={{ marginTop: "25px", marginLeft: "5px"}}
                                    // style={{flex: ""}}
                                    // variant="fab"
                                    // mini
                                    aria-label="Upload"
                                >
                                <PhotoCamera />
                            </IconButton>
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid item xl={12}>
                                    {/* <FormHelperText className={classes.textField}>{errors.image.length > 0 && errors.image[0]}</FormHelperText> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </FormControl>


                    <FormControl error={errors.summary.length > 0} margin="dense" fullWidth>
                        <TextField
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                            id="summary"
                            label="Summary"
                            name="summary"
                            multiline
                            fullWidth
                            value={summary || ""}
                            margin="dense"
                            error={errors.summary.length > 0}
                        />
                        <FormHelperText>{errors.summary.length > 0 && errors.summary[0]}</FormHelperText>
                    </FormControl>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="small"
                        onClick={() => this.handleSubmit()}
                        className={classes.actionButton}
                    >
                        Save
                    </Button>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size="small"
                        className={classes.actionButton}
                        onClick={() => this.handleCancel()}
                    >   
                        Cancel
                    </Button>

                    {/* onClick={this.handleCancel.bind(this)} variant="contained" color="secondary" className={classes.button} */}
                    {/* open={this.state.open} */}
                    {/* <Button onClick={this.handleClickOpen.bind(this)}>Cancel</Button>
                    <Dialog  aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Undo changes?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleCancel.bind(this)} color="primary">
                            Yes, I don't want change
                            </Button>
                            <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
                            Cancel
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                </CardContent>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileEditContent);