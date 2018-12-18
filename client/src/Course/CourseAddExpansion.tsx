import * as React from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Collapse, Dialog, DialogTitle, DialogActions, Button, Card, Typography, CardMedia, CardContent, FormControl, TextField, FormHelperText, Theme, withStyles, createStyles, MenuItem, Grid, Tooltip, IconButton, CardActions, CircularProgress } from '@material-ui/core';
import { IAddCourseForm, IImage, ICourseFormErrors } from 'src/Services/CourseService';
import { CourseValidator } from 'src/Validators/Course/CourseValidator';
import { green } from '@material-ui/core/colors';

const bookImage = require('../images/book.jpeg');

const defaultImageState: IImage = {
    fileName: "",
    imageUrl: bookImage,
    file: null
}

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

const styles = ({ spacing, palette }: Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    card: {
        marginBottom: "40px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    textField: {
        marginLeft: spacing.unit,
        marginRight: spacing.unit,
        minWidth: 200,  
    },
    wrapper: {
        margin: spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
    },
    buttonError: {
        backgroundColor: palette.error.dark
    },
});


interface IPropTypes {
    close: () => any,
    addCourse: (form: IAddCourseForm, onSuccess: () => void, onError: () => void) => any,
    expanded: boolean,
    classes: {
        root: string,
        media: string,
        card: string,
        textField: string,
        formControl: string,
        wrapper: string,
        buttonProgress: string,
        buttonSuccess: string,
        buttonError: string
    }
}

interface IStateTypes {
    form: IAddCourseForm,
    loading: boolean,
    success: boolean,
    dialogOpen: boolean,
    errors: ICourseFormErrors
}

const defaultState = {
    form: {
        title: "",
        author: "",
        url: "",
        image: defaultImageState,
        description: "",
        category: ""
    },
    loading: false,
    success: false,
    dialogOpen: false,
    errors: {
        title: [],
        author: [],
        url: [],
        image: [],
        description: [],
        category: []
    }
}

class CourseAddExpansion extends React.Component<IPropTypes, IStateTypes> {

    private upload: HTMLInputElement | null;
    private courseValidator: CourseValidator;

    constructor(props: IPropTypes) {
        super(props);

        this.state = defaultState;

        this.courseValidator = new CourseValidator(() => this.state.form);
    }

    componentWillUnmount() {
        this.setState({
            ...defaultState
        });
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
        this.setState({ loading: false }, this.close);
    }

    onError() {
        this.setState({ loading: false });
    }

    addCourse() {
        const course = this.state.form;

        this.props.addCourse(course, () => this.onSuccess(), () => this.onError())
    }

    handleSubmit() {
        this.setErrors(() => {
            if(this.thereAreNoErrors()) {
                this.setState({ loading: true }, this.addCourse);
            }
        });
    }

    handleInputChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = target;

        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    close() {
        this.setState({ ...defaultState, dialogOpen: false }, () => this.props.close());
    }

    closeDialog() {
        this.setState({ dialogOpen: false });
    }

    openConfirmationDialog() {
        this.setState({ dialogOpen: true });
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

    render() {
        const { expanded, classes } = this.props;

        const { dialogOpen, errors, loading } = this.state;
        const { title, author, category, url, description, image } = this.state.form;

        const saveBtnClassName = this.thereAreNoErrors() ? "" : classes.buttonError;

        return (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Dialog open={dialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"If you do that your changes won't be saved"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.closeDialog()} color="primary" autoFocus>
                            Keep Changes
                        </Button>
                        <Button onClick={() => this.close()} color="secondary">
                                Cancel
                        </Button>
                     </DialogActions>
                </Dialog> 
                 <Card style={{margin: "3px", marginBottom: "40px"}} className={classes.card}>
                     <Typography style={{margin: "20px"}} variant="display1" color="textSecondary">
                             Add A Course
                     </Typography>
                     <CardMedia
                         style={{margin: "20px 0px 20px 0px"}}
                         className={classes.media}
                         image={image.imageUrl}
                         title="Contemplative Reptile"
                     />
                     <CardContent>
                         <FormControl error={errors.title.length > 0}>
                             <TextField error={errors.title.length > 0} value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} name="title" className={classes.textField} label="Title" type="text" placeholder="Title"></TextField>
                             <FormHelperText className={classes.textField}>{errors.title.length > 0 && errors.title[0]}</FormHelperText>
                         </FormControl>

                         <FormControl error={errors.author.length > 0}>
                             <TextField error={errors.author.length > 0} value={author} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} name="author" className={classes.textField} label="Author" type="text" placeholder="Author"></TextField>
                             <FormHelperText className={classes.textField}>{errors.author.length > 0 && errors.author[0]}</FormHelperText>
                         </FormControl>

                         <FormControl error={errors.url.length > 0}>
                             <TextField error={errors.url.length > 0} value={url} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} name="url" className={classes.textField} label="Link" type="url" placeholder="http://"></TextField>
                             <FormHelperText className={classes.textField}>{errors.url.length > 0 && errors.url[0]}</FormHelperText>
                         </FormControl>

                         <FormControl error={errors.category.length > 0}>
                             <TextField 
                                 select
                                 error={errors.category.length > 0} 
                                 name="category" 
                                 className={classes.textField}
                                 label="Category"
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                                 value={category}
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
                                         className="floatingButton"
                                         onClick={() => this.handleUpload()}
                                         style={{ marginTop: "25px", marginLeft: "5px"}}
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

                         <FormControl error={errors.description.length > 0} margin="normal" fullWidth>
                             <TextField
                                error={errors.description.length > 0} 
                                value={description} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                                label="Description" 
                                name="description"
                                className={classes.textField}
                                multiline
                                fullWidth
                                margin="normal"
                             />
                             <FormHelperText className={classes.textField}>{errors.description.length > 0 && errors.description[0]}</FormHelperText>
                         </FormControl>
                        <CardActions style={{ padding: "0px" }}>
                            <div className={classes.wrapper}>
                                <Button className={saveBtnClassName} disabled={loading} variant="contained"  onClick={() => this.handleSubmit()} size="small" color="primary">
                                    Add Course
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                            <Button onClick={() => this.openConfirmationDialog()} size="small" color="primary">
                                Cancel
                            </Button>
                        </CardActions>
                    </CardContent>  
                </Card>
            </Collapse>
        );
    }
}

export default withStyles(styles)(CourseAddExpansion);