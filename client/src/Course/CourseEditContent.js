import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
// import { Redirect, matchPath } from 'react-router';
import bookImage from '../images/book.jpeg';
import PropTypes from 'prop-types';
import { CardContent, Button, FormControl, TextField, FormHelperText, MenuItem, CardMedia, withStyles, Grid, Tooltip, IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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

const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

class CourseEditContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course: props.course,
            errors: {},
            image: {
                file_name: ""
            }
        }       
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

            this.setState(prevState => ({
                course: {
                    ...prevState.course,
                    [name]: value
                }
            }));
    }

    handleSave(e) {
        console.log(this.state.course)
        this.props.handleEditLoading();

        const file = this.upload.files[0];
        var formData = new FormData();
        if(file) formData.append("image", file, file.name);

        Object.keys(this.state.course).map(key => {
            formData.append(key, this.state.course[key]);
        });

        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/v1/courses/${this.state.course.id}`,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            // this.setState({ loading: false, success: true, errors: {} }, resolve);
            // this.props.showSnackbar("Succesfully added course", "success");
            this.props.handleEditSuccess();
        })
        .catch(err => {
            const { errors } = err.response.data;
            console.log(err.response)
            this.setState({ errors }, _ => this.props.handleEditError(errors));
        });

        // setTimeout(() => {
        //     axios.put(`${process.env.REACT_APP_API_URL}/api/v1/courses/${this.state.course.id}`, { ... this.state })
        //     .then(res => {
        //         this.props.handleEditSuccess();
        //     })
        //     .catch(err => {
        //         const { errors } = err.response.data;
        //         console.log(errors)
        //         this.setState({ errors }, _ => this.props.handleEditError(errors));
        //     });
        // }, 500); 
    }

    handleCancel(event) {
        this.props.handleEditExpand();
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

        // const image = this.upload && this.upload.files.length != 0 ? URL.createObjectURL(this.upload.files[0]) : profile.banner_url;
        
        if(file) {
            if(this.validateFile(file)) {
                this.setState(prevState => ({
                    image: {
                        ...prevState.image,
                        file_name: file.name,
                    }
                }), _ => {
                    console.log("hi")
                    this.props.setImageUrl(URL.createObjectURL(file));
                });
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

    // setImageUrl(url)
    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        // const image_url = this.state.course.image_url;

        const shouldMarkError = {
            title: this.shouldMarkError("title"),
            author: this.shouldMarkError("author"),
            url: this.shouldMarkError("url"),
            description: this.shouldMarkError("description"),
            category: this.shouldMarkError("category"),
            image: this.shouldMarkError("image"),
        }

        return (
            <CardContent>
                {/* <CardMedia
                    className={classes.media}
                    image={image_url ? image_url : bookImage}
                    title="Books"
                /> */}
                <FormControl error={shouldMarkError.title} className={classes.formControl}>
                    <TextField
                    error={shouldMarkError.title}
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="title"
                    name="title"
                    label="Title"
                    value={this.state.course.title}
                    />
                    <FormHelperText className={classes.textField}>{shouldMarkError.title && errors.title[0]}</FormHelperText>
                </FormControl>
                <FormControl error={shouldMarkError.author} className={classes.formControl}>
                    <TextField
                    error={shouldMarkError.author}
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="author"
                    name="author"
                    label="Author"
                    value={this.state.course.author}
                    />
                    <FormHelperText className={classes.textField}>{shouldMarkError.author && errors.author[0]}</FormHelperText>
                </FormControl>
                <FormControl error={shouldMarkError.url} className={classes.formControl}>
                    <TextField
                    error={shouldMarkError.url}
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="url"
                    id="url"
                    label="Link"
                    name="url"
                    value={this.state.course.url}
                    margin="normal"
                    />
                    <FormHelperText className={classes.textField}>{shouldMarkError.url && errors.url[0]}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} error={shouldMarkError.category}>
                    <TextField 
                        select
                        error={shouldMarkError.category} 
                        name="category" 
                        className={classes.textField}
                        label="Category"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.course.category}
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
                            <Tooltip disableHoverListener={this.state.image.file_name == ""} title={this.state.image.file_name}>
                                <TextField
                                value={this.state.image.file_name}
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
                <FormControl error={shouldMarkError.description} className={classes.formControl} fullWidth>
                    <TextField
                    error={shouldMarkError.description}
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="description"
                    label="Description"
                    name="description"
                    value={this.state.course.description}
                    margin="normal"
                    multiline
                    />
                    <FormHelperText className={classes.textField}>{shouldMarkError.description && errors.description[0]}</FormHelperText>
                </FormControl>
                <div style={{marginTop: "20px"}}>
                    <Button onClick={this.handleSave.bind(this)} variant="contained" color="primary" className={classes.button}>Save</Button>
                    <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
                </div>
            </CardContent>
        );
    }
}

CourseEditContent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseEditContent);