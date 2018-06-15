import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
// import axios from 'axios';
import Auth from './Auth';
import RecommendationCreateModal from './Recommendation/RecommendationCreateModal';

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
        // const profileLink = isLoggedIn ? <li className="nav-item"><a className="nav-link" href="/profile">Profile</a></li> : <div></div>;
        // const videoLink = isLoggedIn  ? <li className="nav-item"><a className="nav-link" href="/videos">Videos</a></li> : <div></div>;
        // const rightNav = !isLoggedIn ?   <ul className="navbar-nav ml-auto mr-5">
        //                                     <li className="nav-item">
        //                                         <a className="nav-link" href="/signup">Sign Up</a>
        //                                     </li>
                                            
        //                                     <li className="nav-item">
        //                                         <a className="nav-link" href="/login">Log In</a>
        //                                     </li>
        //                                 </ul>
        //                             :   <ul className="navbar-nav  ml-auto mr-5">
        //                                     <li className="nav-item mr-5">
        //                                         <RecommendationCreateModal />
        //                                         {/* <button className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} href="/recommend">Recommend Something</button> */}
        //                                     </li>
        //                                     <li className="nav-item">
        //                                         <a className="nav-link" href="/logout">Log Out</a>
        //                                     </li>
        //                                 </ul>;

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
                            {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
                            <br/>
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

        // return (
        //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //         <a className="navbar-brand ml-5" href="/">Courseify</a>
        //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul className="navbar-nav">
        //                 <li className="nav-item active">
        //                     <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
        //                 </li>
        //                 {profileLink}
        //                 {videoLink}
                        
        //             </ul>
        //             {rightNav}
        //         </div>
        //     </nav>
        // );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);