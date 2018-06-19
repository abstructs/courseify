import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    }
});

class SimpleSnackbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message_info: {}
        }
    }

    queue = [];
  
    handleClick = message => _ => {
        this.queue.push({
            message,
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

    handleClose = (event, reason) => {
        if(reason === 'clickaway') return;
        this.setState({ open: false });
    };

    handleExited() {
        this.processQueue();
    }


  render() {
    const { classes } = this.props;
    const { message, key } = this.state.message_info;

    return (
      <div>
        <Button onClick={this.handleClick('message').bind(this)}>Open simple snackbar</Button>
        <Snackbar
            key={key}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            onExited={this.handleExited.bind(this)}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose.bind(this)}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{ message }</span>}
            action={[
                // <Button key="undo" color="secondary" size="small" onClick={this.handleClose.bind(this)}>
                //   UNDO
                // </Button>,
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleClose.bind(this)}>
                <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

SimpleSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);



    