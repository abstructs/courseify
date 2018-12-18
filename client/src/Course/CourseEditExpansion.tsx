/* tslint:disable */

import * as React from 'react';

import { CardContent, Button, FormControl, TextField, FormHelperText, MenuItem, withStyles, Grid, Tooltip, IconButton, Theme, createStyles, CircularProgress } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { ICourse, ICourseFormErrors, IEditCourseForm, IImage } from 'src/Services/CourseService';
import { CourseValidator } from 'src/Validators/Course/CourseValidator';

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
    buttonError: {
        backgroundColor: palette.error.dark,
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    },
});

interface IPropTypes {
    close: () => any,
    onSuccess: (newCourse: IEditCourseForm) => any,
    updateCourse: (form: IEditCourseForm, onSuccess: () => void, onError: () => void) => any,
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
    // private courseService: CourseService;
    
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
        // this.courseService = new CourseService();
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

    onSuccess() {
        this.setState({ loading: false }, this.props.onSuccess(this.state.form));
    }

    onError() {
        this.setState({ loading: false });
    }

    updateCourse() {
        const course = this.state.form;

        this.props.updateCourse(course, () => this.onSuccess(), () => this.onError())
    }

    handleSubmit() {
        this.setErrors(() => {
            if(this.thereAreNoErrors()) {
                this.setState({ loading: true }, this.updateCourse);
            }
        });
    }

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
                    <Button onClick={() => this.props.close()}>Cancel</Button>
                </div>
            </CardContent>
        );
    }
}

export default withStyles(styles)(CourseEditExpansion);
