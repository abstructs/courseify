import * as React from 'react';
import '../App.css';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, Fade } from '@material-ui/core';

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

interface IPropTypes {
    classes: {
        flex: string,
        root: string,
        menuButton: string
    },
    isAuthenticated: boolean
}

interface IStateTypes {
    anchorEl: (HTMLElement | null);
}

class Navbar extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            anchorEl: null,
        };
    }

    handleClick(event: React.MouseEvent<HTMLElement>) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }

    render() {
        const { classes, isAuthenticated } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton onClick={this.handleClick} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                            <Menu
                                id="fade-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                                TransitionComponent={Fade}
                            >
                                <Button style={{ marginLeft: "5px", marginRight: "5px" }} size="medium" href="/profile">Profile</Button>
                                <br />
                                <Button style={{ marginLeft: "5px", marginRight: "5px" }} size="medium" href="/courses">Courses</Button>
                                {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}

                                {/* <Button style={{ marginLeft: "5px", marginRight: "5px" }} size="medium" button href="/logout" onClick={this.handleClose}>Logout</Button> */}
                            </Menu>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Courseify
                    </Typography>
                        {isAuthenticated ?
                            <div>
                                <Button href="/" color="inherit">Home</Button>
                                <Button href="/logout" color="inherit">Logout</Button>
                            </div>
                            :
                            <div>
                                <Button href="/" color="inherit">Home</Button>
                                <Button href="/signup" color="inherit">Sign Up</Button>
                                <Button href="/login" color="inherit">Login</Button>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Navbar);