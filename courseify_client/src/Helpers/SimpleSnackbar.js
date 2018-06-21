import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import classNames from 'classnames';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';
import { SnackbarContent } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
    //   width: '100%',
    //   maxWidth: 360,
    //   backgroundColor: theme.palette.background.paper,
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    success: {
        backgroundColor: green[600],
    },
      error: {
        backgroundColor: theme.palette.error.dark,
    },
      info: {
        backgroundColor: theme.palette.primary.dark,
    },
      warning: {
        backgroundColor: amber[700],
    },
      icon: {
        fontSize: 20,
    },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
      message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class SimpleSnackbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message_info: {}
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    queue = [];
  
    handleClick(message, variant) {
        this.queue.push({
            message,
            variant,
            key: new Date().getTime()
        });

        if(this.state.open) {
            this.setState({ open: false });
        }
        else {
            this.processQueue();
        }
    }

    processQueue() {
        if(this.queue.length > 0) {
            this.setState({
                message_info: this.queue.shift(),
                open: true
            })
        }
    }

    componentWillUpdate() {
        // this.handleClick(this.props.message)
        // if(this.props.clicked) {
        //     this.props.snackbarClickedCallback(_ => this.setState({ snackbarClicked: false }, 
        //         _ => this.handleClick(this.props.message)()));
            
        // }
    }
    
    componentDidUpdate() {
        // this.props.snackbarClickedCallback(_ => this.setState({ snackbarClicked: false }));
        // console.log('did update')
    }
    

    handleSnackbarClose = (event, reason) => {
        if(reason === 'clickaway') return;
        this.setState({ open: false });
    };

    handleSnackbarExited() {
        this.processQueue();
    }


  render() {
    const { clicked, classes, className, onClose, ...other } = this.props;
    const { message, key, variant } = this.state.message_info;
    const variantIcon = {
        success: CheckCircleIcon,
        warning: WarningIcon,
        error: ErrorIcon,
        info: InfoIcon,
    };
    const Icon = variantIcon[variant];

    return (
        <Snackbar
        ref={this.props.snackbarRef}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        onExited={this.handleSnackbarExited.bind(this)}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleSnackbarClose.bind(this)}
        // ContentProps={{
        //     'aria-describedby': 'message-id',
        // }}
        >
            <SnackbarContent
                key={key}
                className={classNames(classes[variant])}
                message={
                    <span id="message-id">
                        <Icon className={classNames(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>}
                action={[
                    // <Button key="undo" color="secondary" size="small" onClick={this.handleClose.bind(this)}>
                    //   UNDO
                    // </Button>,
                <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleSnackbarClose.bind(this)}>
                    <CloseIcon />
                </IconButton>
                ]}
            />
        </Snackbar>
    );
  }
}

SimpleSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);



    