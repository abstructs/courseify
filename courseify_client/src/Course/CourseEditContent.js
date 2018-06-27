import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
import PropTypes from 'prop-types';
import { CardContent, Button, FormControl, TextField, FormHelperText, MenuItem } from '@material-ui/core';

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

class CourseEditContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.course,
            errors: {}
        }        
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSave(e) {
        this.props.handleEditLoading();

        setTimeout(() => {
            axios.put(`http://localhost:3000/api/v1/courses/${this.state.id}`, { ... this.state })
            .then(res => {
                this.props.handleEditSuccess();
            })
            .catch(err => {
                const { errors } = err.response.data;
                console.log(errors)
                this.setState({ errors }, _ => this.props.handleEditError(errors));
            });
        }, 500); 
    }

    handleCancel(event) {
        this.props.handleEditExpand();
    }

    shouldMarkError(paramName) {
        const errors = this.state.errors[paramName] || [];
        return errors.length != 0;
    }

    render() {
        const { classes } = this.props;
        const { errors } = this.state;

        const shouldMarkError = {
            title: this.shouldMarkError("title"),
            author: this.shouldMarkError("author"),
            url: this.shouldMarkError("url"),
            description: this.shouldMarkError("description"),
            category: this.shouldMarkError("category")
        }

        return (
            <CardContent>
                <FormControl error={shouldMarkError.title} className={classes.formControl}>
                    <TextField
                    error={shouldMarkError.title}
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="title"
                    name="title"
                    label="Title"
                    value={this.state.title}
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
                    value={this.state.author}
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
                    value={this.state.url}
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
                        value={this.state.category}
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
                <FormControl error={shouldMarkError.description} className={classes.formControl} fullWidth>
                    <TextField
                    error={shouldMarkError.description}
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="description"
                    label="Description"
                    name="description"
                    value={this.state.description}
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

export default CourseEditContent;