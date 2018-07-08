import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { CardContent, Typography, CardActions, Collapse, Card, Button, FormControl, TextField, CircularProgress, FormHelperText, MenuItem, InputAdornment, Grid, Tooltip, IconButton, CardMedia } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import bookImage from '../images/book.jpeg';

const categories = [
    {
        label: "Computer Science", 
        value: "computer_science"
    }, 
    { 
        label: "Data Science", 
        value: "data_science"
    }
];

class CourseAddExpansion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {
                title: "",
                author: "",
                url: "",
                description: "",
                category: ""
            },
            loading: false,
            success: undefined,
            dialog_open: false,
            errors: {},
            image: {
                file_name: "",
                url: bookImage
            }
        }
    }

    clearState() {
        this.setState({
            course: {
                title: "",
                author: "",
                url: "",
                description: ""
            },
            loading: false,
            success: false,
            dialog_open: false
        })
    }

    componentWillUnmount() {
        this.clearState();
    }

    handleCourseAdd(e) {
        const { course, loading, success } = this.state;

        const file = this.upload.files[0];
        var formData = new FormData();
        if(file) formData.append("image", file, file.name);

        Object.keys(course).map(key => {
            formData.append(key, this.state.course[key]);
        });

        if(!loading && !success) {
            this.setState({
                loading: true, 
                success: false,
            }, 
            _ => {
                new Promise(resolve => {
                    setTimeout(_ => {
                        axios({
                            method: 'post',
                            url: `http://localhost:3000/api/v1/courses`,
                            data: formData,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                            })
                            .then(res => {
                                this.setState({ loading: false, success: true, errors: {} }, resolve);
                                this.props.showSnackbar("Succesfully added course", "success");
                            })
                            .catch(err => {
                                const { errors } = err.response.data;
                                console.log(errors)
                                this.setState(
                                    { loading: false, success: false , errors }, 
                                    _ => new Error());
                                this.props.showSnackbar("Something went wrong, check the form for details", "error");
                            })
                        })
                    }, 1000)
                    .then(_ => {
                        setTimeout(_ => {
                            this.props.handleCourseAddSuccess();
                        }, 1000);
                    })
                // .catch(err => {
                //     console.log(err)
                // })
            });
        }
    }

    handleCourseChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            // ...prevState,
            course: {
                ...prevState.course,
                [name]: value
            }
        })); 
    }

    handleCancel(e) {
        this.setState({ dialog_open: false }, _ => this.props.handleCancel());
    }

    handleCloseDialog() {
        this.setState({ dialog_open: false });
    }

    handleOpenDialog(e) {
        this.setState({ dialog_open: true });
    }
    
    shouldMarkError(paramName) {
        const errors = this.state.errors[paramName] || [];
        return errors.length != 0;
    }

    handleFileChange() {
        const uploadInput = this.upload 
        const file = uploadInput && uploadInput.files.length !== 0 ? uploadInput.files[0] : false;

        // const image = this.upload && this.upload.files.length != 0 ? URL.createObjectURL(this.upload.files[0]) : profile.banner_url;
        
        if(file) {
            if(this.validateFile(file)) {
                this.setState(prevState => ({
                    image: {
                        ...prevState.image,
                        file_name: file.name,
                        url: URL.createObjectURL(file)
                    }
                }));
            } else {
                this.setState(prevState => ({
                    // ...prevState,
                    errors: {
                        ...prevState.errors,
                        image: [file.type + " is not a valid file format"]
                    },
                    image: {
                        url: bookImage,
                        file_name: file.name
                    }
                }));
            }
        }
        else {
            this.setState(prevState => ({
                image: {
                    ...prevState.image,
                    url: bookImage,
                    file_name: ""
                }
            }));
        }   
    }

    validateFile(file) {
        return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.name);
    }

    handleUpload() {
        this.upload.click();
    }

    render() {

        const { classes, expanded } = this.props;
        const { course, loading, success, errors, image } = this.state;
        const addBtnClassName = success != undefined ? (success ? classes.buttonSuccess : classes.buttonError) : "";
        
        const shouldMarkError = {
            title: this.shouldMarkError("title"),
            author: this.shouldMarkError("author"),
            url: this.shouldMarkError("url"),
            description: this.shouldMarkError("description"),
            category: this.shouldMarkError("category"),
            image: this.shouldMarkError("image")
        };
        // classNames({
        //     [classes.buttonSuccess]: success,
        //     // [classes.buttonError]: !success && !loading
        // });

        return (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {/* <Dialog open={this.state.dialog_open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"If you do that your changes won't be saved"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog.bind(this)} color="primary" autoFocus>
                            Keep Changes
                        </Button>
                        <Button onClick={this.handleCancel.bind(this)} color="secondary">
                            Cancel
                        </Button>

                    </DialogActions>
                </Dialog> */}
                <Card style={{margin: "3px", marginBottom: "40px"}} className={classes.card}>
                    <Typography style={{margin: "20px"}} variant="display1" color="textSecondary">
                            Add A Course
                    </Typography>
                    <CardMedia
                        style={{margin: "20px 0px 20px 0px"}}
                        className={classes.media}
                        image={image.url}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <FormControl error={shouldMarkError.title}>
                            <TextField error={shouldMarkError.title} value={course.title} onChange={this.handleCourseChange.bind(this)} name="title" className={classes.textField} label="Title" type="text" placeholder="Title"></TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.title ? errors.title[0] : ""}</FormHelperText>
                        </FormControl>

                        <FormControl error={shouldMarkError.author}>
                            <TextField error={shouldMarkError.author} value={course.author} onChange={this.handleCourseChange.bind(this)} name="author" className={classes.textField} label="Author" type="text" placeholder="Author"></TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.author ? errors.author[0] : ""}</FormHelperText>
                        </FormControl>

                        <FormControl error={shouldMarkError.url}>
                            <TextField error={shouldMarkError.url} value={course.url} onChange={this.handleCourseChange.bind(this)} name="url" className={classes.textField} label="Link" type="url" placeholder="http://"></TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.url ? errors.url[0] : ""}</FormHelperText>
                        </FormControl>

                        <FormControl error={shouldMarkError.category}>
                            <TextField 
                                select
                                error={shouldMarkError.category} 
                                name="category" 
                                className={classes.textField}
                                label="Category"
                                onChange={this.handleCourseChange.bind(this)}
                                value={course.category}
                                // InputProps={{
                                //     startAdornment: <InputAdornment position="start">Category</InputAdornment>,
                                // }}
                            >
                                {categories.map((option, i) => {
                                    return (
                                        <MenuItem 
                                        key={i}
                                        value={option.value}
                                        >
                                        {option.label}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                            <FormHelperText className={classes.textField}>{shouldMarkError.category ? errors.category[0] : ""}</FormHelperText>
                        </FormControl>
                        
                        <FormControl error={shouldMarkError.image} className={classes.formControl}>
                            <Grid container spacing={0}>
                                <Grid item xl={6}>
                                    <input accept="image/*" onChange={this.handleFileChange.bind(this)} type="file"  ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
                                    <Tooltip disableHoverListener={image.file_name == ""} title={image.file_name}>
                                        <TextField
                                        value={image.file_name}
                                        name="image"
                                        margin="normal"
                                        className={classes.textField}
                                        label="Image"
                                        disabled
                                        error={shouldMarkError.image}
                                        color="primary"
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xl={2}>
                                <IconButton
                                    // style={{display: "inline"}}
                                    className="floatingButton"
                                    onClick={this.handleUpload.bind(this) }
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
                                    <FormHelperText className={classes.textField}>{shouldMarkError.image ? errors.image[0] : ""}</FormHelperText>
                                </Grid>
                            </Grid>
                        </Grid>
                        </FormControl>

                        <FormControl error={shouldMarkError.description} margin="normal" fullWidth>
                            <TextField
                            error={shouldMarkError.description} 
                            value={course.description} 
                            onChange={this.handleCourseChange.bind(this)}
                            label="Description" 
                            name="description"
                            className={classes.textField}
                            multiline
                            fullWidth
                            // value={this.state.profile.summary}
                            margin="normal"
                            />
                            <FormHelperText className={classes.textField}>{shouldMarkError.description ? errors.description[0] : ""}</FormHelperText>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                    <div className={classes.wrapper}>
                        <Button className={addBtnClassName} variant="contained" disabled={loading} onClick={this.handleCourseAdd.bind(this)} size="small" color="primary">
                            Add Course
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    <Button onClick={this.props.handleCancel.bind(this)} size="small" color="primary">
                        Cancel
                    </Button>
                    </CardActions>
                </Card>
            </Collapse>
        );
    }
}

CourseAddExpansion.propTypes = {
    classes: PropTypes.object.isRequired
};

export default CourseAddExpansion;