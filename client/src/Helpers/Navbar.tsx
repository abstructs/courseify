import * as React from 'react';
import '../App.css';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem, MenuList } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    menuItem: {
        textDecoration: 'none', 
        border: 'none'
    },
    menuItemFocused: {
        textDecoration: 'none'
    },
    menuList: {
        margin: "-8px 0 -8px 0",
        padding: "0 !important"
    }
};

interface IPropTypes {
    classes: {
        flex: string,
        root: string,
        menuButton: string,
        menuItem: string,
        menuList: string
    },
    isAuthenticated: () => boolean
}

interface IStateTypes {
    anchorEl: (HTMLElement | null),
    menuOpen: boolean
}

class Navbar extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            anchorEl: null,
            menuOpen: false
        };
    }

    openMenu(event: React.MouseEvent<HTMLElement>) {
        // this.setState({ anchorEl: event.currentTarget });
        event.preventDefault();
        
        this.setState({
            menuOpen: true,
            anchorEl: event.currentTarget
        });
    }

    closeMenu() {
        this.setState({
            menuOpen: false
        });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }
    
    onClickAway() {
        console.log("click away")
        this.setState({
            anchorEl: null
        });
    }

    render() {
        const { classes, isAuthenticated } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            onClick={(e: React.MouseEvent<HTMLElement>) => this.openMenu(e)} 
                            className={classes.menuButton} 
                            color="inherit" 
                            aria-label="Menu"
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                        >
                            <MenuIcon />
                        </IconButton>
                            <Menu
                                id="fade-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                disableAutoFocus={true}
                                onClose={() => this.handleClose()}   
                                // TransitionComponent={Fade}
                            >   
                                <MenuList className={classes.menuList}>
                                    <Link to='/profile' className={classes.menuItem}>
                                        <MenuItem>Profile</MenuItem>
                                    </Link>
                                    <Link to='/courses' className={classes.menuItem}>
                                        <MenuItem>Courses</MenuItem>
                                    </Link>
                                </MenuList>
                                
                                {/* <ClickAwayListener onClickAway={() => {}}> */}
                                    {/* <div> */}
                                        
                                        {/* <Button style={{ marginLeft: "5px", marginRight: "5px" }} size="medium" href="/profile">Profile</Button> */}
                                        {/* <br/> */}
                                        {/* <Button style={{ marginLeft: "5px", marginRight: "5px" }} size="medium" href="/courses">Courses</Button> */}
                                    {/* </div> */}
                                {/* </ClickAwayListener> */}
                            </Menu>
                        {/* </IconButton> */}
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Courseify
                    </Typography>
                        {isAuthenticated() ?
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