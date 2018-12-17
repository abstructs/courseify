/* tslint:disable */

import * as React from 'react';
// import '../App.css';
// import axios from 'axios';
// import { Redirect, matchPath } from 'react-router';
// import bookImage from '../images/book.jpeg';
// import PropTypes from 'prop-types';

import { CardContent, Button, FormControl, TextField, FormHelperText, MenuItem, withStyles, Grid, Tooltip, IconButton, Theme, createStyles, CircularProgress } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { ICourse, ICourseFormErrors, IEditCourseForm, IImage, CourseService } from 'src/Services/CourseService';
import { CourseValidator } from 'src/Validators/Course/CourseValidator';
// import { green } from '@material-ui/core/colors';

const bookImage = require('../images/book.jpeg');

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

const styles = ({ palette }: Theme) => createStyles({
    // media: {
    //     height: 0,
    //     paddingTop: '56.25%', // 16:9
    // }
    // buttonSuccess: {
    //     backgroundColor: green[500],
    //     '&:hover': {
    //         backgroundColor: green[700],
    //     },
    // },
    buttonError: {
        backgroundColor: palette.error.dark,
    },
    buttonProgress: {
        // color: "",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

interface IPropTypes {
    onCancel: () => any,
    onSuccess: (form: IEditCourseForm) => any,
    course: ICourse,
    classes: {
        formControl: string,
        textField: string,
        buttonError: string,
        buttonProgress: string
    }
}

interface IStateTypes {
    form: IEditCourseForm,
    errors: ICourseFormErrors,
    loading: boolean
}

const defaultImageState: IImage = {
    fileName: "",
    imageUrl: bookImage,
    file: null
}

class CourseEditExpansion extends React.Component<IPropTypes, IStateTypes> {

    private upload: HTMLInputElement | null;
    private courseValidator: CourseValidator;
    private courseService: CourseService;
    
    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            form: {
                ...props.course,
                image: defaultImageState
            },
            errors: {
                title: [],
                author: [],
                url: [],
                image: [],
                description: [],
                category: []
            },
            loading: false
        }       

        this.courseValidator = new CourseValidator(() => this.state.form);
        this.courseService = new CourseService();
    }

    handleInputChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = target;

        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleFileChange() {
        if(this.upload && this.upload.files && this.upload.files.length > 0) {
            const file = this.upload.files[0];

            this.setState({
                form: {
                    ...this.state.form,
                    image: {
                        fileName: file.name,
                        imageUrl: URL.createObjectURL(file),
                        file
                    }
                }
            });
        } else {
            this.setState({
                form: {
                    ...this.state.form,
                    image: defaultImageState
                }
            });
        }
    }

    handleUpload() {
        if(this.upload) {
            this.upload.click();
        }
    }

    getFieldsWithErrors(): Array<String> {
        return Object.keys(this.state.errors).filter(key => this.state.errors[key].length > 0);
    }

    thereAreNoErrors(): boolean {
        return this.getFieldsWithErrors().length == 0;
    }

    setErrors(callback: () => void): void {
        const errors = this.courseValidator.getErrors();

        this.setState({ errors }, callback);
    }

    updateCourse() {
        this.courseService.updateCourse(this.state.form, (res) => {
            this.setState({ loading: false}, () => this.props.onSuccess(this.state.form));
        }, (err) => {
            this.setState({ loading: false });
            console.error("something went wrong");
        });
    }

    handleSubmit() {
        this.setErrors(() => {
            if(this.thereAreNoErrors()) {
                this.setState({ loading: true }, this.updateCourse);
            }
        });
    }

    // handleSave(e) {
    //     console.log(this.state.course)
    //     this.props.handleEditLoading();

    //     const file = this.upload.files[0];
    //     var formData = new FormData();
    //     if(file) formData.append("image", file, file.name);

    //     Object.keys(this.state.course).map(key => {
    //         formData.append(key, this.state.course[key]);
    //     });

    //     axios({
    //         method: 'put',
    //         url: `${process.env.REACT_APP_API_URL}/v1/courses/${this.state.course.id}`,
    //         data: formData,
    //         config: { headers: {'Content-Type': 'multipart/form-data' }}
    //     })
    //     .then(res => {
    //         // this.setState({ loading: false, success: true, errors: {} }, resolve);
    //         // this.props.showSnackbar("Succesfully added course", "success");
    //         this.props.handleEditSuccess();
    //     })
    //     .catch(err => {
    //         const { errors } = err.response.data;
    //         console.log(err.response)
    //         this.setState({ errors }, _ => this.props.handleEditError(errors));
    //     });

    //     // setTimeout(() => {
    //     //     axios.put(`${process.env.REACT_APP_API_URL}/api/v1/courses/${this.state.course.id}`, { ... this.state })
    //     //     .then(res => {
    //     //         this.props.handleEditSuccess();
    //     //     })
    //     //     .catch(err => {
    //     //         const { errors } = err.response.data;
    //     //         console.log(errors)
    //     //         this.setState({ errors }, _ => this.props.handleEditError(errors));
    //     //     });
    //     // }, 500); 
    // }

    // handleCancel(event) {
    //     this.props.handleEditExpand();
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
    //                 image: {
    //                     ...prevState.image,
    //                     file_name: file.name,
    //                 }
    //             }), _ => {
    //                 console.log("hi")
    //                 this.props.setImageUrl(URL.createObjectURL(file));
    //             });
    //         } else {
    //             this.setState(prevState => ({
    //                 // ...prevState,
    //                 errors: {
    //                     ...prevState.errors,
    //                     image: [file.type + " is not a valid file format"]
    //                 },
    //                 image: {
    //                     url: bookImage,
    //                     file_name: file.name
    //                 }
    //             }));
    //         }
    //     }
    //     else {
    //         this.setState(prevState => ({
    //             image: {
    //                 ...prevState.image,
    //                 url: bookImage,
    //                 file_name: ""
    //             }
    //         }));
    //     }   
    // }

    // setImageUrl(url)
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        const { title, author, category, url, description, image } = this.state.form;

        const saveBtnClassName = this.thereAreNoErrors() ? "" : classes.buttonError;

        // const image_url = this.state.course.image_url;

        // const shouldMarkError = {
        //     title: this.shouldMarkError("title"),
        //     author: this.shouldMarkError("author"),
        //     url: this.shouldMarkError("url"),
        //     description: this.shouldMarkError("description"),
        //     category: this.shouldMarkError("category"),
        //     image: this.shouldMarkError("image"),
        // }

        return (
            <CardContent>
                {/* <CardMedia
                    className={classes.media}
                    image={image_url ? image_url : bookImage}
                    title="Books"
                /> */}
                <FormControl error={errors.title.length > 0} className={classes.formControl}>
                    <TextField
                        error={errors.title.length > 0}
                        className={classes.textField}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                        type="text"
                        id="title"
                        name="title"
                        label="Title"
                        value={title}
                    />
                    <FormHelperText className={classes.textField}>{errors.title.length > 0 && errors.title[0]}</FormHelperText>
                </FormControl>
                <FormControl error={errors.author.length > 0} className={classes.formControl}>
                    <TextField
                        error={errors.author.length > 0}
                        className={classes.textField}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                        type="text"
                        id="author"
                        name="author"
                        label="Author"
                        value={author}
                    />
                    <FormHelperText className={classes.textField}>{errors.author.length > 0 && errors.author[0]}</FormHelperText>
                </FormControl>
                <FormControl error={errors.url.length > 0} className={classes.formControl}>
                    <TextField
                        error={errors.url.length > 0}
                        className={classes.textField}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                        type="url"
                        id="url"
                        label="Link"
                        name="url"
                        value={url}
                        margin="normal"
                    />
                    <FormHelperText className={classes.textField}>{errors.url.length > 0 && errors.url[0]}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} error={errors.category.length > 0}>
                    <TextField 
                        select
                        error={errors.category.length > 0} 
                        name="category" 
                        className={classes.textField}
                        label="Category"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                        value={category}
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
                    <FormHelperText className={classes.textField}>{errors.category.length > 0 && errors.category[0]}</FormHelperText>
                </FormControl>
                <FormControl error={errors.image.length > 0} className={classes.formControl}>
                    <Grid container spacing={0}>
                        <Grid item xl={6}>
                            <input accept="image/*" onChange={() => this.handleFileChange()} type="file"  ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
                            <Tooltip disableHoverListener={image.fileName == ""} title={image.fileName}>
                                <TextField
                                    value={image.fileName}
                                    name="image"
                                    margin="normal"
                                    className={classes.textField}
                                    label="Image"
                                    disabled
                                    error={errors.image.length > 0}
                                    color="primary"
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xl={2}>
                            <IconButton
                                // style={{display: "inline"}}
                                className="floatingButton"
                                onClick={() => this.handleUpload() }
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
                                <FormHelperText className={classes.textField}>{errors.image.length > 0 && errors.image[0]}</FormHelperText>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormControl>
                <FormControl error={errors.description.length > 0} className={classes.formControl} fullWidth>
                    <TextField
                        error={errors.description.length > 0}
                        className={classes.textField}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                        type="text"
                        id="description"
                        label="Description"
                        name="description"
                        value={description}
                        margin="normal"
                        multiline
                    />
                    <FormHelperText className={classes.textField}>{errors.description.length > 0 && errors.description[0]}</FormHelperText>
                </FormControl>
                <div style={{marginTop: "20px"}}>
                    <Button disabled={loading} className={saveBtnClassName} onClick={() => this.handleSubmit()} variant="contained" color="primary">Save</Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    <Button onClick={() => this.props.onCancel()}>Cancel</Button>
                </div>
            </CardContent>
        );
    }
}

export default withStyles(styles)(CourseEditExpansion);
