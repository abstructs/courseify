import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import { withStyles, CardContent, Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormHelperText, CircularProgress, Grid, LinearProgress, Input, Tooltip, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
        margin: theme.spacing.unit,
        position: 'relative',
    },
});

// TODO: Change ProfileEdit to handle it's own state
class ProfileEditContent extends Component {
    constructor(props) {
        super(props);           
        
        this.state = {
            profile: props.profile,
            errors: {},
            open: false,
            loading: false,
            success: undefined,
            banner_file_name: ""
        }

    }

    handleClickOpen() {
        this.setState({ open: true });
    }

    handleCancel(e) {
        this.handleClose();
        this.props.toggleEdit();

    }

    handleSave(event) {
        const file = this.upload.files[0];
        var formData = new FormData();
        formData.append("file", file, "filename");

        // axios.put("http://localhost:3000/api/v1/users/" + this.state.profile.id, { file },
        //     // { headers: {'Content-Type': 'multipart/form-data' }}
        // )
        // .then(res => console.log(res))
        // .catch(err => console.log(err.response));

        Object.keys(this.state.profile).map(key => {
            formData.append(key, this.state.profile[key]);
        });

        axios({
            method: 'put',
            url: `http://localhost:3000/api/v1/users/${this.state.profile.username}`,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
        });

        // this.setState({ loading: true }, _ => {
        //     axios.put("http://localhost:3000/api/v1/users/" + this.state.profile.id, this.state.profile)
        //     // .then(res => this.props.refreshUserInfo())
        //     .then(_ => this.props.refreshUserInfo())
        //     .catch(err => {
        //         const { errors } = err.response.data;
        //         this.setState({ errors, loading: false });
        //     });
        // })
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

    handleClose() {
        this.setState({ open: false })
    }

    shouldMarkError(paramName) {
        const errors = this.state.errors[paramName] || [];
        return errors.length != 0;
    }

    handleUpload() {
        this.upload.click();
    }

    validateFile(file) {
        return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.name);
    }
    
    handleFileChange() {
        const uploadInput = this.upload 
        const file = uploadInput && uploadInput.files.length !== 0 ? uploadInput.files[0] : false;

        

        if(file && this.validateFile(file)) {
            this.setState({ banner_file_name: file.name });
            
        } else {
            this.setState(prevState => ({
                // ...prevState,
                errors: {
                    ...prevState.errors,
                    banner_image: [file.type + " is not a valid file format"]
                }
            }));
        }
        
        
    }

    render() {
        const { classes, toggleEdit } = this.props;
        const { profile, errors, loading, success } = this.state;

        const addBtnClassName = success != undefined ? (success ? classes.buttonSuccess : classes.buttonError) : "";

        const shouldMarkError = {
            first_name: this.shouldMarkError("first_name"),
            last_name: this.shouldMarkError("last_name"),
            username: this.shouldMarkError("username"),
            country: this.shouldMarkError("country"),
            headline: this.shouldMarkError("headline"),
            summary: this.shouldMarkError("summary"),
            banner_image: this.shouldMarkError("banner_image")
        }

        return (
            <div className={classes.root} noValidate autoComplete="off">
                <CardContent>
                    <FormControl error={shouldMarkError.first_name} className={classes.formControl}>
                        {/* <Input
                        // onChange={this.handleChange.bind(this)}
                        id="banner_image"
                        // name="banner_image"
                        // type="file"
                        label="Banner Image"
                        value={""}
                        // error={shouldMarkError.first_name}
                        /> */}
                        {/* <Button primary={true} label="Choose an Image" component={"input"}>
                            
                        </Button> */}
                        <FormHelperText>{shouldMarkError.first_name ? errors.first_name[0] : ""}</FormHelperText>
                    </FormControl>
                    <FormControl error={shouldMarkError.first_name} className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        value={this.state.profile.first_name}
                        error={shouldMarkError.first_name}
                        />
                        <FormHelperText>{shouldMarkError.first_name ? errors.first_name[0] : ""}</FormHelperText>
                    </FormControl>
                    <FormControl error={shouldMarkError.last_name} className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        value={this.state.profile.last_name}
                        error={shouldMarkError.last_name} 
                        />
                        <FormHelperText>{shouldMarkError.last_name ? errors.last_name[0] : ""}</FormHelperText>
                    </FormControl>
                    <FormControl error={shouldMarkError.username} className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="username"
                        name="username"
                        label="Username"
                        value={this.state.profile.username}
                        error={shouldMarkError.username}
                        />
                        <FormHelperText>{shouldMarkError.username ? errors.username[0] : ""}</FormHelperText>
                    </FormControl>
                    {/* <Button onClick={toggleEdit} style={{float: "right", marginTop: "-43px", marginRight: "30px"}} variant="fab" color="secondary" aria-label="add" className={classes.button}>
                        <EditIcon />
                    </Button> */}
                    <FormControl error={shouldMarkError.country} className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="country"
                        label="Country"
                        name="country"
                        value={this.state.profile.country}
                        margin="normal"
                        error={shouldMarkError.country}
                        />
                        <FormHelperText>{shouldMarkError.country ? errors.country[0] : ""}</FormHelperText>
                    </FormControl>
                    <FormControl error={shouldMarkError.headline} className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="headline"
                        label="Headline"
                        name="headline"
                        value={this.state.profile.headline}
                        fullWidth={true}
                        margin="normal"
                        error={shouldMarkError.headline}
                        />
                        <FormHelperText>{shouldMarkError.headline ? errors.headline[0] : ""}</FormHelperText>
                    </FormControl>
                    <FormControl style={{width: "35%", display: "inline-block"}} error={shouldMarkError.banner_image} className={classes.formControl}>
                        <input onChange={this.handleFileChange.bind(this)} type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
                        {/* <p style={{display: "inline"}}> file: books.jpeg</p> */}
                        <Tooltip disableHoverListener={this.state.banner_file_name == ""} title={this.state.banner_file_name}>
                            <TextField
                            value={this.state.banner_file_name}
                            name="banner"
                            margin="normal"
                            label="Banner Image"
                            disabled
                            error={shouldMarkError.banner_image}
                            style={{display: "inline-block"}}
                            color="primary"
                        />
                        </Tooltip>
                        {/* <FormHelperText>{shouldMarkError.banner_image ? errors.banner_image[0] : ""}</FormHelperText> */}
                        <IconButton
                        // style={{display: "inline"}}
                        className="floatingButton"
                        onClick={this.handleUpload.bind(this) }
                        style={{display: "inline-block", marginLeft: "15px"}}
                        // variant="fab"
                        // mini
                        aria-label="Upload"
                        >
                            <PhotoCamera />
                        </IconButton>
                    </FormControl>
                    <FormControl error={shouldMarkError.summary} margin="normal" fullWidth>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="summary"
                        label="Summary"
                        name="summary"
                        multiline
                        fullWidth
                        value={this.state.profile.summary}
                        margin="normal"
                        error={shouldMarkError.summary}
                        />
                        <FormHelperText>{shouldMarkError.summary ? errors.summary[0] : ""}</FormHelperText>
                    </FormControl>
                    {/* <Button  variant="contained"  onClick={this.handleCourseAdd.bind(this)} size="small" color="primary"> */}
                    <Button className={addBtnClassName} disabled={loading} onClick={this.handleSave.bind(this)} variant="contained" color="primary" size="small">
                        {loading ? "Loading" : "Save"}
                    </Button>

                    {/* onClick={this.handleCancel.bind(this)} variant="contained" color="secondary" className={classes.button} */}
                    <Button onClick={this.handleClickOpen.bind(this)}>Cancel</Button>
                    <Dialog open={this.state.open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Undo changes?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleCancel.bind(this)} color="primary">
                            Yes, I don't want change
                            </Button>
                            <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
                            Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </div>
        );
    }
}

ProfileEditContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileEditContent);