import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
// import axios from 'axios';
import Auth from './Auth';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, Fade, MenuItem } from '@material-ui/core';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };


class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };
    }

    handleClick = event => {
        console.log("click")
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const isLoggedIn = Auth().isAuthenticated();
        const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.root}>
              <AppBar position="static" color="primary">
                <Toolbar>
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                  {isLoggedIn ?
                    <div>
                        <MenuIcon onClick={this.handleClick} />
                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            TransitionComponent={Fade}
                        >
                        <Button style={{ marginLeft: "5px", marginRight: "5px" }} size="medium" button="true" href="/profile">Profile</Button>
                        <br/>
                        <Button style={{ marginLeft: "5px", marginRight: "5px" }} size="medium" button="true" href="/recommendations">Recommendations</Button>
                            {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
                            
                            {/* <Button style={{ marginLeft: "5px", marginRight: "5px" }} size="medium" button href="/logout" onClick={this.handleClose}>Logout</Button> */}
                        </Menu>
                    </div>
                    :
                    <div></div>
                  }
                  </IconButton>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Courseify
                  </Typography>
                  {!isLoggedIn ?
                    <div>
                        <Button href="/" color="inherit">Home</Button>
                        <Button href="/signup" color="inherit">Sign Up</Button>
                        <Button href="/login" color="inherit">Login</Button>
                    </div>
                    :
                    <div>
                        <Button href="/" color="inherit">Home</Button>
                        <Button href="/logout" color="inherit">Logout</Button>
                    </div>}
                </Toolbar>
              </AppBar>
            </div>
        );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);