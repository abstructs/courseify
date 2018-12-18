import * as React from 'react';
import '../App.css';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent, IconButton, Theme, withStyles } from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// import classNames from 'classnames';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
// import green from '@material-ui/core/colors/green';
// import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';
import { amber, green } from '@material-ui/core/colors';
// import { Theme } from '@material-ui/core';

const styles = ({ spacing, palette }: Theme) => ({
    root: {
        flexGrow: 1,
    //   width: '100%',
    //   maxWidth: 360,
    //   backgroundColor: theme.palette.background.paper,
    },
    close: {
        width: spacing.unit * 4,
        height: spacing.unit * 4,
    },
    success: {
        backgroundColor: green[600],
    },
      error: {
        backgroundColor: palette.error.dark,
    },
      info: {
        backgroundColor: palette.primary.dark,
    },
      warning: {
        backgroundColor: amber[700],
    },
      icon: {
        fontSize: 20,
    },
      iconVariant: {
        opacity: 0.9,
        marginRight: spacing.unit,
    },
      message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const variantIcons = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

interface IStateTypes {
    open: boolean,
    messageData: ISnackbarData
}

export enum Variant {
    Success = "success",
    Error = "error",
    Info = "info",
    Warning = "warning"
}

interface IPropTypes {
    // onRef: (ref: AppSnackBar) => void;
    setOpenSnackbar: (openSnackbar: (message: string, variant: Variant) => void) => void
    // message: string,
    // variant: string,
    classes: {
        close: string,
        icon: string,
        iconVariant: string
    }
}

// enum ISnackbarType {

// }

interface ISnackbarData {
    message: string, 
    variant: Variant,
    key: number
}

class AppSnackBar extends React.Component<IPropTypes, IStateTypes> {

    private queue: Array<ISnackbarData>;

    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            open: false,
            messageData: {
                message: "",
                variant: Variant.Info,
                key: 0
            }
        }

        this.queue = [];
    }

    componentDidMount() {
        this.props.setOpenSnackbar(this.showSnackbar.bind(this));
    }
  
    showSnackbar(message: string, variant: Variant): void {
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
        const nextMessage = this.queue.shift();

        if(nextMessage != undefined) {
            this.setState({
                open: true,
                messageData: nextMessage
            });
        }
    }

    // componentWillUpdate() {
    //     this.handleClick(this.props.message, this.props.variant);

        // if(this.props.clicked) {
        //     this.props.snackbarClickedCallback(_ => this.setState({ snackbarClicked: false }, 
        //         _ => this.handleClick(this.props.message)()));
            
    //     }
    // }
    
    // componentDidUpdate() {
        // this.props.snackbarClickedCallback(_ => this.setState({ snackbarClicked: false }));
        // console.log('did update')
    // }
    

    handleSnackbarClose(reason: string) {
        if(reason === 'clickaway') return;
        this.setState({ open: false });
    };

    handleSnackbarExited() {
        this.processQueue();
    }

    show() {
        this.setState({ open: true });
    }

    render() {
    // const { clicked, classes, className, onClose, ...other } = this.props;
    const { message, key, variant } = this.state.messageData;
    const { classes } = this.props;

    // message, key, variant = true;
    // const variantIcon = {
    //     success: CheckCircleIcon,
    //     warning: WarningIcon,
    //     error: ErrorIcon,
    //     info: InfoIcon,
    // };

    const Icon = variantIcons[variant];

    return (
        <Snackbar
        // ref={this.props.snackbarRef}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        // onExited={this.handleSnackbarExited.bind(this)}
        open={this.state.open}
        autoHideDuration={6000}
        // onClose={this.handleSnackbarClose.bind(this)}
        // ContentProps={{
        //     'aria-describedby': 'message-id',
        // }}
        >
            <SnackbarContent
                key={key}
                className={classes[variant]}
                message={
                    <span>
                        <Icon className={classes.icon + " " + classes.iconVariant} />
                        {message}
                    </span>}
                action={
                    <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleSnackbarClose.bind(this)}>
                        <CloseIcon />
                    </IconButton>   
                }
                                    // <Button key="undo" color="secondary" size="small" onClick={this.handleClose.bind(this)}>
                    //   UNDO
                    // </Button>,
            />
        </Snackbar>
    );
  }
}

export default withStyles(styles)(AppSnackBar);



    