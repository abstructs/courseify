/* tslint:disable */

import * as React from 'react';
// import { CardContent, Typography, CardActions, Collapse, Card, Button, FormControl, TextField, CircularProgress, FormHelperText, MenuItem, InputAdornment, Grid, Tooltip, IconButton, CardMedia } from '@material-ui/core';

// import PropTypes from 'prop-types';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Collapse, Dialog, DialogTitle, DialogActions, Button, Card, Typography, CardMedia, CardContent, FormControl, TextField, FormHelperText, Theme, withStyles, createStyles, InputAdornment, MenuItem } from '@material-ui/core';

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

const styles = ({ spacing }: Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    card: {
        // maxWidth: 800,
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
});

interface IAddCourseForm {
    title: string,
    author: string,
    courseUrl: string,
    description: string,
    category: string
}

interface ICourseAddFormErrors {
    title: Array<String>,
    author: Array<String>,
    courseUrl: Array<String>,
    description: Array<String>,
    category: Array<String>
}

interface IImage {
    fileName: string,
    image: any
}

interface IPropTypes {
    onCancel: Function,
    expanded: boolean,
    classes: {
        root: string,
        media: string,
        card: string,
        textField: string
    }
}

interface IStateTypes {
    form: IAddCourseForm,
    loading: boolean,
    success: boolean,
    dialogOpen: boolean,
    errors: ICourseAddFormErrors,
    image: IImage
}

class CourseAddExpansion extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            form: {
                title: "",
                author: "",
                courseUrl: "",
                description: "",
                category: ""
            },
            loading: false,
            success: false,
            dialogOpen: false,
            errors: {
                title: [],
                author: [],
                courseUrl: [],
                description: [],
                category: []
            },
            image: {
                fileName: "",
                image: bookImage
            }
        }
    }

    clearState() {
        this.setState({
            form: {
                title: "",
                author: "",
                courseUrl: "",
                description: "",
                category: ""
            },
            loading: false,
            success: false,
            dialogOpen: false
        });
    }

    componentWillUnmount() {
        this.clearState();
    }

    handleCourseAdd() {
        // const { course, loading, success } = this.state;

        // const file = this.upload.files[0];
        // var formData = new FormData();
        // if(file) formData.append("image", file, file.name);

        // Object.keys(course).map(key => {
        //     formData.append(key, course[key]);
        // });

        // if(!loading && !success) {
        //     this.setState({
        //         loading: true, 
        //         success: false,
        //     }, 
        //     _ => {
        //         new Promise(resolve => {
        //             setTimeout(_ => {
        //                 axios({
        //                     method: 'post',
        //                     url: `${process.env.REACT_APP_API_URL}/api/v1/courses`,
        //                     data: formData,
        //                     config: { headers: {'Content-Type': 'multipart/form-data' }}
        //                     })
        //                     .then(res => {
        //                         this.setState({ loading: false, success: true, errors: {} }, resolve);
        //                         this.props.showSnackbar("Succesfully added course", "success");
        //                     })
        //                     .catch(err => {
        //                         const { errors } = err.response.data;
        //                         console.log(errors)
        //                         this.setState(
        //                             { loading: false, success: false , errors }, 
        //                             _ => new Error());
        //                         this.props.showSnackbar("Something went wrong, check the form for details", "error");
        //                     })
        //                 })
        //             }, 1000)
        //             .then(_ => {
        //                 setTimeout(_ => {
        //                     this.props.handleCourseAddSuccess();
        //                 }, 1000);
        //             })
                // .catch(err => {
                //     console.log(err)
                // })
            // });
    }

    handleInputChange({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = currentTarget;

        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleCancel() {
        this.setState({ dialogOpen: false }, () => this.props.onCancel());
    }

    closeDialog() {
        this.setState({ dialogOpen: false });
    }

    // handleOpenDialog(e) {
    //     this.setState({ dialog_open: true });
    // }
    
    // shouldMarkError(paramName) {
    //     const errors = this.state.errors[paramName] || [];
    //     return errors.length != 0;
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
    //                     url: URL.createObjectURL(file)
    //                 }
    //             }));
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

    // validateFile(file) {
    //     return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.name);
    // }

    // handleUpload() {
    //     this.upload.click();
    // }

    render() {
        // classes,
        const { expanded, classes } = this.props;
        // errors, image, course, loading,
        // success,
        const { dialogOpen, errors, image } = this.state;
        const { title, author, category } = this.state.form;
        // const addBtnClassName = success != undefined ? (success ? classes.buttonSuccess : classes.buttonError) : "";
        
        // classNames({
        //     [classes.buttonSuccess]: success,
        //     // [classes.buttonError]: !success && !loading
        // });

        return (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Dialog open={dialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"If you do that your changes won't be saved"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.closeDialog()} color="primary" autoFocus>
                            Keep Changes
                        </Button>
                        <Button onClick={() => this.handleCancel()} color="secondary">
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
                         image={image.image}
                         title="Contemplative Reptile"
                     />
                     <CardContent>
                         <FormControl error={errors.title.length > 0}>
                             <TextField error={errors.title.length > 0} value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} name="title" className={classes.textField} label="Title" type="text" placeholder="Title"></TextField>
                             <FormHelperText className={classes.textField}>{errors.title.length > 0 ? errors.title[0] : ""}</FormHelperText>
                         </FormControl>

                         <FormControl error={errors.author.length > 0}>
                             <TextField error={errors.author.length > 0} value={author} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} name="author" className={classes.textField} label="Author" type="text" placeholder="Author"></TextField>
                             <FormHelperText className={classes.textField}>{errors.author.length > 0 ? errors.author[0] : ""}</FormHelperText>
                         </FormControl>

                         {/* <FormControl error={errors. > 0}>
                             <TextField error={shouldMarkError.url} value={course.url} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} name="url" className={classes.textField} label="Link" type="url" placeholder="http://"></TextField>
                             <FormHelperText className={classes.textField}>{shouldMarkError.url ? errors.url[0] : ""}</FormHelperText>
                         </FormControl> */}

                         <FormControl error={errors.category.length > 0}>
                             <TextField 
                                 select
                                 error={errors.category.length > 0} 
                                 name="category" 
                                 className={classes.textField}
                                 label="Category"
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}
                                 value={category}
                                  InputProps={{
                                      startAdornment: <InputAdornment position="start">Category</InputAdornment>,
                                  }}
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
                             <FormHelperText className={classes.textField}>{errors.category.length > 0 ? errors.category[0] : ""}</FormHelperText>
                        </FormControl>
                    </CardContent>
                </Card>
            </Collapse>
        );
                        
    //                     <FormControl error={shouldMarkError.image} className={classes.formControl}>
    //                         <Grid container spacing={0}>
    //                             <Grid item xl={6}>
    //                                 <input accept="image/*" onChange={this.handleFileChange.bind(this)} type="file"  ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
    //                                 <Tooltip disableHoverListener={image.file_name == ""} title={image.file_name}>
    //                                     <TextField
    //                                     value={image.file_name}
    //                                     name="image"
    //                                     margin="normal"
    //                                     className={classes.textField}
    //                                     label="Image"
    //                                     disabled
    //                                     error={shouldMarkError.image}
    //                                     color="primary"
    //                                     />
    //                                 </Tooltip>
    //                             </Grid>
    //                             <Grid item xl={2}>
    //                                 <IconButton
    //                                     // style={{display: "inline"}}
    //                                     className="floatingButton"
    //                                     onClick={this.handleUpload.bind(this) }
    //                                     style={{ marginTop: "25px", marginLeft: "5px"}}
    //                                     // style={{flex: ""}}
    //                                     // variant="fab"
    //                                     // mini
    //                                     aria-label="Upload"
    //                                 >
    //                                 <PhotoCamera />
    //                             </IconButton>
    //                             </Grid>
    //                             <Grid container spacing={0}>
    //                                 <Grid item xl={12}>
    //                                     <FormHelperText className={classes.textField}>{shouldMarkError.image ? errors.image[0] : ""}</FormHelperText>
    //                                 </Grid>
    //                             </Grid>
    //                         </Grid>
    //                     </FormControl>

    //                     <FormControl error={shouldMarkError.description} margin="normal" fullWidth>
    //                         <TextField
    //                         error={shouldMarkError.description} 
    //                         value={course.description} 
    //                         onChange={this.handleCourseChange.bind(this)}
    //                         label="Description" 
    //                         name="description"
    //                         className={classes.textField}
    //                         multiline
    //                         fullWidth
    //                         // value={this.state.profile.summary}
    //                         margin="normal"
    //                         />
    //                         <FormHelperText className={classes.textField}>{shouldMarkError.description ? errors.description[0] : ""}</FormHelperText>
    //                     </FormControl>
    //                 </CardContent>
    //                 <CardActions>
    //                 <div className={classes.wrapper}>
    //                     <Button className={addBtnClassName} variant="contained" disabled={loading} onClick={this.handleCourseAdd.bind(this)} size="small" color="primary">
    //                         Add Course
    //                     </Button>
    //                     {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    //                 </div>
    //                 <Button onClick={this.props.handleCancel.bind(this)} size="small" color="primary">
    //                     Cancel
    //                 </Button>
    //                 </CardActions>
    //             </Card>
    //         </Collapse>
    //     );
    }
}

export default withStyles(styles)(CourseAddExpansion);