import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { CardContent, Typography, CardActions, Collapse, Card, Button, FormControl, TextField, CircularProgress, FormHelperText } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class CourseAddExpansion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {
                title: "",
                author: "",
                url: "",
                description: ""
            },
            loading: false,
            success: undefined,
            dialog_open: false,
            errors: {}
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

        if(!loading && !success) {
            this.setState({
                loading: true, 
                success: false,
            }, 
            _ => {
                new Promise(resolve => {
                    setTimeout(_ => {
                        axios.post(`http://localhost:3000/api/v1/courses`, { ...course })
                        .then(res => {
                            this.setState({ loading: false, success: true, errors: {} }, resolve);
                            this.props.showSnackbar("Succesfully added course", "success");
                        })
                        .catch(err => {
                            const { errors } = err.response.data;
                            this.setState(
                                { loading: false, success: false , errors }, 
                                _ => new Error());
                            this.props.showSnackbar("Something went wrong, check the form for details", "error");
                        })
                    }, 1000)
                })
                .then(_ => {
                    setTimeout(_ => {
                        this.props.handleCancel();
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

    render() {

        const { classes, expanded } = this.props;
        const { course, loading, success, errors } = this.state;
        const addBtnClassName = success != undefined ? (success ? classes.buttonSuccess : classes.buttonError) : "";
        
        const shouldMarkError = {
            title: this.shouldMarkError("title"),
            author: this.shouldMarkError("author"),
            url: this.shouldMarkError("url"),
            description: this.shouldMarkError("description")
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
                    {/* <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    /> */}
                    <CardContent>
                        <Typography variant="display1" color="textSecondary">
                            Add A Course
                        </Typography>
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