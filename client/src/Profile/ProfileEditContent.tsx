import * as React from 'react';
import '../App.css';
// import { withStyles, CardContent, Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormHelperText, CircularProgress, Grid, LinearProgress, Input, Tooltip, IconButton, CardMedia, Theme } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Theme, CardMedia, CardContent, FormControl, TextField, FormHelperText, Grid, IconButton, Button, withStyles, createStyles } from '@material-ui/core';
import { IUser, IUserEditFormErrors, IUserEditForm } from 'src/Services/UserService';
const bookImage =  require('../images/book.jpeg');

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
    margin: {
        margin: spacing.unit,
    },
    withoutLabel: {
        marginTop: spacing.unit * 3,
    },
    formControl: {
        margin: spacing.unit,
    },
    button: {
        margin: spacing.unit
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
    user: IUserEditForm,
    errors: IUserEditFormErrors
}

interface IPropTypes {
    user: IUser,
    classes: {
        media: string,
        formControl: string
    }
}

// TODO: Change ProfileEdit to handle it's own state
class ProfileEditContent extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);           
        
        this.state = {
            user: props.user,
            errors: {},
            // open: false,
            // loading: false,
            // success: undefined,
            // banner: {
            //     file_name: "",
            //     url: props.profile.banner_url
            // }
        }

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

    render() {
        const { classes } = this.props;
        // const { profile, errors, loading, success, banner } = this.state;

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
                    <FormControl className={classes.formControl}>
                        <TextField
                        // onChange={this.handleChange.bind(this)}
                        style={{marginLeft: "0px"}} 
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        // value={this.state.profile.first_name}
                        // margin="dense"
                        // error={shouldMarkError.first_name}
                        />
                        <FormHelperText></FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                        // onChange={this.handleChange.bind(this)}
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        // value={this.state.profile.last_name}
                        // error={shouldMarkError.last_name} 
                        margin="dense"
                        />
                        {/* <FormHelperText>{shouldMarkError.last_name ? errors.last_name[0] : ""}</FormHelperText> */}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                        // onChange={this.handleChange.bind(this)}
                        id="username"
                        name="username"
                        label="Username"
                        // value={this.state.profile.username}
                        // error={shouldMarkError.username}
                        margin="dense"
                        />
                        {/* <FormHelperText>{shouldMarkError.username ? errors.username[0] : ""}</FormHelperText> */}
                    </FormControl>
                    {/* <Button onClick={toggleEdit} style={{float: "right", marginTop: "-43px", marginRight: "30px"}} variant="fab" color="secondary" aria-label="add" className={classes.button}>
                        <EditIcon />
                    </Button> */}
                    <FormControl className={classes.formControl}>
                        <TextField
                            // onChange={this.handleChange.bind(this)}
                            id="country"
                            label="Country"
                            name="country"
                            // value={this.state.profile.country}
                            margin="dense"
                            // error={shouldMarkError.country}
                        />
                        {/* <FormHelperText>{shouldMarkError.country ? errors.country[0] : ""}</FormHelperText> */}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                        // onChange={this.handleChange.bind(this)}
                        id="headline"
                        label="Headline"
                        name="headline"
                        // value={this.state.profile.headline}
                        fullWidth={true}
                        margin="dense"
                        // error={shouldMarkError.headline}
                        />
                        {/* <FormHelperText>{shouldMarkError.headline ? errors.headline[0] : ""}</FormHelperText> */}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Grid container spacing={0}>
                            <Grid item xl={6}>
                                {/* <input accept="image/*" onChange={this.handleFileChange.bind(this)} type="file"  ref={(ref) => this.upload = ref} style={{ display: 'none' }} /> */}
                                {/* <p style={{display: "inline"}}> file: books.jpeg</p> */}
                                {/* <Tooltip disableHoverListener={banner.file_name == ""} title={banner.file_name}>
                                    <TextField
                                    // value={banner.file_name}
                                    name="banner"
                                    margin="dense"
                                    label="Banner Image"
                                    disabled
                                    error={shouldMarkError.banner}
                                    style={{flex: ""}}
                                    color="primary"
                                    /> */}
                                {/* </Tooltip> */}
                            </Grid>
                            <Grid item xl={2}>
                            <IconButton
                                // style={{display: "inline"}}
                                className="floatingButton"
                                // onClick={this.handleUpload.bind(this) }
                                style={{ marginTop: "15px", marginLeft: "15px"}}
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
                                {/* <FormHelperText>{shouldMarkError.banner ? errors.banner[0] : ""}</FormHelperText> */}
                            </Grid>
                        </Grid>
                    </Grid>
                    </FormControl>
                    <FormControl margin="dense" fullWidth>
                        <TextField
                        // onChange={this.handleChange.bind(this)}
                            id="summary"
                            label="Summary"
                            name="summary"
                            multiline
                            fullWidth
                            // value={this.state.profile.summary}
                            margin="dense"
                            // error={shouldMarkError.summary}
                        />
                        {/* <FormHelperText>{shouldMarkError.summary ? errors.summary[0] : ""}</FormHelperText> */}
                    </FormControl>
                    {/* <Button  variant="contained"  onClick={this.handleCourseAdd.bind(this)} size="small" color="primary"> */}
                    {/* className={addBtnClassName}  */}
                    {/* onClick={this.handleSave.bind(this)}  */}
                    <Button variant="contained" color="primary" size="small">
                        {/* {loading ? "Loading" : "Save"} */}
                        Save
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