// import React, { Component } from 'react';
// import '../App.css';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

// import classNames from 'classnames';

// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import ErrorIcon from '@material-ui/icons/Error';
// import InfoIcon from '@material-ui/icons/Info';
// import green from '@material-ui/core/colors/green';
// import amber from '@material-ui/core/colors/amber';
// import WarningIcon from '@material-ui/icons/Warning';
// import { SnackbarContent } from '@material-ui/core';

// const styles = theme => ({
//     root: {
//         flexGrow: 1,
//     //   width: '100%',
//     //   maxWidth: 360,
//     //   backgroundColor: theme.palette.background.paper,
//     },
//     close: {
//         width: theme.spacing.unit * 4,
//         height: theme.spacing.unit * 4,
//     }
// });

// const variantIcon = {
//     success: CheckCircleIcon,
//     warning: WarningIcon,
//     error: ErrorIcon,
//     info: InfoIcon,
// };
  
// const styles1 = theme => ({
//     success: {
//       backgroundColor: green[600],
//     },
//     error: {
//       backgroundColor: theme.palette.error.dark,
//     },
//     info: {
//       backgroundColor: theme.palette.primary.dark,
//     },
//     warning: {
//       backgroundColor: amber[700],
//     },
//     icon: {
//       fontSize: 20,
//     },
//     iconVariant: {
//       opacity: 0.9,
//       marginRight: theme.spacing.unit,
//     },
//     message: {
//       display: 'flex',
//       alignItems: 'center',
//     },
// });

// class SimpleSnackbar extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             open: false,
//             message_info: {}
//         }
//     }

//     queue = [];
  
//     handleClick = message => _ => {
//         this.queue.push({
//             message,
//             key: new Date().getTime()
//         });

//         if(this.state.open) {
//             this.setState({ open: false });
//         }
//         else {
//             this.processQueue();
//         }
//     }

//     processQueue() {
//         if(this.queue.length > 0) {
//             this.setState({
//                 message_info: this.queue.shift(),
//                 open: true
//             })
//         }
//     }

//     handleSnackbarClose = (event, reason) => {
//         if(reason === 'clickaway') return;
//         this.setState({ open: false });
//     };

//     handleSnackbarExited() {
//         this.processQueue();
//     }


//   render() {
//     const { classes } = this.props;
//     const { classes, className, message, onClose, variant, ...other } = this.props;

//     return (
//       <div>
//         <Button onClick={this.handleClick(message).bind(this)}>Hello</Button>
//         <SnackbarContent
//         className={classNames(classes[variant], className)}
//         aria-describedby="client-snackbar"
//         message={
//             <span id="client-snackbar" className={classes.message}>
//             {/* <Icon className={classNames(classes.icon, classes.iconVariant)} /> */}
//             {message}
//             </span>
//         }
//         action={[
//             <IconButton
//             key="close"
//             aria-label="Close"
//             color="inherit"
//             className={classes.close}
//             onClick={onClose}
//             >
//             <CloseIcon className={classes.icon} />
//             </IconButton>,
//         ]}
//         {...other}
//         />
//       </div>
//     )
//   }
// }

// SimpleSnackbar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleSnackbar);



    