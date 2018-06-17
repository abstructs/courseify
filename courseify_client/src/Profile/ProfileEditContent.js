import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import { withStyles, CardContent, Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import PropTypes from 'prop-types';

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
    }
});

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>

      </div>
    );
  }
}

// TODO: Change ProfileEdit to handle it's own state
class ProfileEditContent extends Component {
    constructor(props) {
        super(props);       
        
        this.state = {
            profile: props.profile,
            open: false
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
        axios.put("http://localhost:3000/api/v1/users/" + this.state.profile.id, this.state.profile)
        // .then(res => this.props.refreshUserInfo())
        .then(_ => this.props.refreshUserInfo())
        .catch(err => console.log('error'));
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

    render() {
        const { classes, toggleEdit } = this.props;
        const { profile } = this.state;

        return (
            <div className={classes.root} noValidate autoComplete="off">
                {/* <CardMedia
                className={classes.media}
                image={bookImage}
                title="Contemplative Reptile"
                /> */}
                <CardContent>
                    <FormControl className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        value={this.state.profile.first_name}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        value={this.state.profile.last_name}
                        />
                    </FormControl>
                    {/* <Button onClick={toggleEdit} style={{float: "right", marginTop: "-43px", marginRight: "30px"}} variant="fab" color="secondary" aria-label="add" className={classes.button}>
                        <EditIcon />
                    </Button> */}
                    <FormControl className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="country"
                        label="Country"
                        name="country"
                        value={this.state.profile.country}
                        margin="normal"
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="headline"
                        label="Headline"
                        name="headline"
                        value={this.state.profile.headline}
                        fullWidth={true}
                        margin="normal"
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                        onChange={this.handleChange.bind(this)}
                        id="summary"
                        label="Summary"
                        name="summary"
                        multiline
                        fullWidth
                        value={this.state.profile.summary}
                        margin="normal"
                        />
                    </FormControl>
                    <AlertDialog />
                    <Button onClick={this.handleSave.bind(this)} variant="contained" color="primary" className={classes.button}>
                        Save
                    </Button>
                    {/* onClick={this.handleCancel.bind(this)} variant="contained" color="secondary" className={classes.button} */}
                    <Button onClick={this.handleClickOpen.bind(this)}>Cancel</Button>
                    <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
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