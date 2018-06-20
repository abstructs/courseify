import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
import PropTypes from 'prop-types';
import { CardContent, Button, FormControl, TextField } from '@material-ui/core';

class CourseEditContent extends Component {
    constructor(props) {
        super(props);

        // console.log(props)

        this.state = {
            ...props.course
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
        axios.put(`http://localhost:3000/api/v1/courses/${this.state.id}`, { ... this.state })
        .then(res => {
            
            this.props.handleEditCallback();
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleCancel(event) {
        this.props.handleEditExpand();
    }

    render() {
        const { classes } = this.props;

        return (
            <CardContent>
                <FormControl className={classes.formControl}>
                    <TextField
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="title"
                    name="title"
                    label="Title"
                    value={this.state.title}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    id="author"
                    name="author"
                    label="Author"
                    value={this.state.author}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                    className={classes.textField}
                    onChange={this.handleChange.bind(this)}
                    type="url"
                    id="url"
                    label="Link"
                    name="url"
                    value={this.state.url}
                    margin="normal"
                    />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <TextField
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