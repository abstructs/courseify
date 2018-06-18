import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
import $ from 'jquery';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import bookImage from '../images/book.jpeg';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Divider, ListSubheader, CardHeader, CardMedia, CardContent, Typography, CardActions, Collapse, Card, withStyles, Button, IconButton, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper, Input, FormControl, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DoneIcon from '@material-ui/icons/Done';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    card: {
        // maxWidth: 800,
        marginBottom: "40px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 200,  
    },
    // expand: {
    //   transform: 'rotate(0deg)',
    //   transition: theme.transitions.create('transform', {
    //     duration: theme.transitions.duration.shortest,
    //   }),
    //   marginLeft: 'auto',
    // },
    // expandOpen: {
    //   transform: 'rotate(180deg)',
    // },
    avatar: {
    //   backgroundColor: red[500],
    },
  });

class RecommendationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recommendations: [],
            expanded: false
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3000/api/v1/recommendations')
        .then(res => {
            const { recommendations } = res.data;
            this.setState({ recommendations });
        })
        // this.setState({
        //     ...this.props.recommendation
        // })
        // console.log(this.props.recommendation);
    }

    handleRecommendationChange(event) {  
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleUpdate(e) {
        const new_data = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            url: this.state.url
        }
        
        axios.put(`http://localhost:3000/api/v1/recommendations/${this.state.id}`, new_data)
        .then(res => this.setState({ ...new_data }))
        .then(_ => 
            swal({
                    title: "Success",
                    text: "Update totally went through :)",
                    icon: "success",
                    timer: 3000
            })
        )
        .then(_ => $(`#recommendation-modal-${this.state.id}`).modal('hide'));
        // e.preventDefault();
        // e.stopPropagation();
        // console.log("update")
        // return false;
    }

    handleExpandClick(e) {
        this.setState({ expanded: !this.state.expanded});
    }

    handleDelete(e) {
        swal({
            title: "Are you sure?",
            text: "Once it's gone... It's gone.",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
        .then(willDelete => {
            if(willDelete) {
                axios.delete(`http://localhost:3000/api/v1/recommendations/${this.state.id}`)
                .then(res => {
                    swal("Poof! It's been deleted", {
                        icon: "success",
                    })
                    .then(_ => $(`#recommendation-modal-${this.state.id}`).modal('hide'))
                    .then(_ => { 
                        this.props.incrementRecommendations(-1);
                        this.setState({ deleted: true });
                    })
                    .catch(err => console.error(err.response.data) /* handle err */);
                })
            } else { 
                swal("It's all good, it's safe!");
            }
        })
        console.log("run")

    }

    render() {
        if(this.state.deleted) return <div></div>;
        const { classes } = this.props;
        // onClick={this.handleDropdown.bind(this)} 
        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify="space-between">
                    <Grid item md={3}>
                        <List component="nav" subheader={<ListSubheader component="div">Categories</ListSubheader>}>
                            <Divider />
                            <ListItem button>
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Computer Science" />
                            </ListItem>
                            <ListItem button >
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Data Science" />
                            </ListItem>
                            <ListItem button >
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Engineering" />
                            </ListItem>
                            <ListItem button >
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Social Sciences" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={40}>
                            <Grid item xs={12}>
                                <Typography variant="display1" align="left" style={{marginTop: "50px"}} color="text-secondary">
                                    Courses
                                </Typography>
                                <Typography variant="caption" align="left" style={{marginTop: "5px"}} color="text-secondary">
                                    See what people are recommending.
                                </Typography>
                                <Button onClick={this.handleExpandClick.bind(this)}  color="primary" style={{float: "right"}}>
                                    Add A Course
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>

                                    <Card style={{margin: "3px", marginBottom: "40px"}} className={classes.card}>
                                        {/* <CardMedia
                                        className={classes.media}
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        title="Contemplative Reptile"
                                        /> */}
                                        <CardContent>
                                            
                                            <TextField name="title" className={classes.textField} label="Title" type="text" placeholder="Title"></TextField>
                                            <TextField name="author" className={classes.textField} label="Author" type="text" placeholder="Author"></TextField>

                                            {/* <FormControl fullWidth margin="normal"> */}
                                            <TextField name="url" className={classes.textField} label="Link" type="url" placeholder="http://"></TextField>

                                            <FormControl margin="normal" fullWidth>
                                                <TextField
                                                // onChange={this.handleChange.bind(this)}
                                                label="Summary" 
                                                name="summary"
                                                className={classes.textField}
                                                multiline
                                                fullWidth
                                                // value={this.state.profile.summary}
                                                margin="normal"
                                                />
                                            </FormControl>
                                        </CardContent>
                                        <CardActions>
                                        <Button size="small" color="primary">
                                            Add
                                        </Button>
                                        <Button size="small" color="primary">
                                            Cancel
                                        </Button>
                                        </CardActions>
                                    </Card>

                                </Collapse>
                            </Grid>
                        </Grid>
                        {this.state.recommendations.map(recommendation => {
                            return <RecommendationCard classes={classes} recommendation={recommendation} />;
                        })}
                    </Grid>
                    <Grid item xs={2} style={{width: "100%"}}>

                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Top Authors</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Top People</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel disabled>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Top Courses</Typography>
                            </ExpansionPanelSummary>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            </div>
            // <div className="">
            //     <div className="card m-2" style={{width: "16rem"}}>
            //         <div className="card-body pt-0">
            //             <br/>
            //             <button type="button" style={{top: "10px", right: "10px"}} data-toggle="dropdown" className="position-absolute ml-auto btn dropdown-toggle" aria-haspopup="true" aria-expanded="false"></button>
            //             <h5 className="d-inline card-title mt-5">{this.state.title}</h5>
            //             <h6 className="card-subtitle mb-2 text-muted">By {this.state.author}</h6>
            //             <p className="card-text">{this.state.description}</p>
            //             <a href={this.state.url} target="__blank" className="btn btn-orange text-light">Check It Out</a>

            //             <div className="p-4 dropdown-menu recommendation-dropdown">
            //                 <p className="text-center">Actions</p>
            //                 {/* <button className="btn btn-orange text-light m-2">Update</button> */}
            //                 {/* <button type="button" className="text-light m-2 btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendationModal">Update</button> */}
            //                 <button type="button" className="btn btn-orange text-light" data-toggle="modal" data-target={`#recommendation-modal-${this.state.id}`}>Update</button>
            //                 <button onClick={this.handleDelete.bind(this)} className="btn btn-danger text-light m-2">Delete</button>
            //             </div>
            //         </div>
            //     </div>



            //     <div className="modal fade" id={`recommendation-modal-${this.state.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            //         <div className="modal-dialog" role="document">
            //             <div className="modal-content">
            //                 <div className="modal-header">
            //                     <h5 className="modal-title" id="exampleModalLabel">Change Your Recommendation</h5>
            //                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            //                     <span aria-hidden="true">&times;</span>
            //                     </button>
            //                 </div>
            //                 <div className="modal-body">
            //                     <form >
            //                         <div className="form-group">
            //                             <label className="mr-auto">Title</label>
            //                             <input id={`title_${this.state.id}`} name="title" type="text" className="form-control" placeholder="Title" value={this.state.title} onChange={this.handleRecommendationChange.bind(this)} required />
            //                         </div>
            //                         <div className="form-group">
            //                             <label>Author</label>
            //                             <input id={`author_${this.state.id}`} name="author" type="text" className="form-control" placeholder="Author" value={this.state.author} onChange={this.handleRecommendationChange.bind(this)} required />
            //                         </div>
            //                         <div className="form-group">
            //                             <label>Link</label>
            //                             <input id={`url_${this.state.id}`} name="url" type="text" className="form-control" placeholder="Link" value={this.state.url} onChange={this.handleRecommendationChange.bind(this)} required />
            //                         </div>
            //                         <div className="form-group">
            //                             <label>Description</label>
            //                             <textarea id={`description_${this.state.id}`} name="description" className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleRecommendationChange.bind(this)} required></textarea>
            //                         </div>
            //                         {/* <div className="form-check">
            //                             <input id={`description_${this.state.id}`} type="checkbox" className="form-check-input" />
            //                             <label className="form-check-label">
            //                             Remember me
            //                             </label>
            //                         </div> */}
            //                         {/* <button type="submit" onClick={this.handleUpdate.bind(this)} className="btn text-light mr-2 btn-orange">Update</button>
            //                         <button className="btn btn-danger">Delete</button> */}
            //                     </form> 
            //                 </div>
            //                 <div className="modal-footer">
            //                     <button type="button" className="btn btn-secondary m-2" data-dismiss="modal">Close</button>
            //                     <button type="button" onClick={this.handleUpdate.bind(this)} className="btn text-light m-2 btn-orange">Save</button>
            //                     <button type="button" onClick={this.handleDelete.bind(this)} className="btn btn-danger m-2">Delete</button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

class RecommendationCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { classes, recommendation} = this.props;

        console.log(recommendation)
        

        return (
            <Card className={classes.card}>
                <CardHeader
                    // style={{paddingBottom: "0px"}}
                    avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        <DoneIcon color="primary" />
                    </Avatar>}
                    // }
                    // action={
                    // <IconButton>
                    //     <MoreVertIcon />
                    // </IconButton>
                    // }
                    title={`${recommendation.title}`}
                    subheader={`by ${recommendation.author}`}
                />
                <CardMedia
                    className={classes.media}
                    image={bookImage}
                    title="Books"
                />
                <CardContent>
                    <Typography component="p" style={{marginBottom: "20px"}} gutterBottom> 
                        {recommendation.description}
                    </Typography>
                    <Button target="_blank" href={`http://${recommendation.url}`} variant="contained" color="primary" style={{float: "right"}}>
                        <AddCircleIcon style={{marginRight: "10px"}} />
                        Take Course
                    </Button>
                    {/* <Typography style={{paddingTop: "10px", marginBottom: "20px"}} color="textSecondary" component="subheading" gutterBottom>
                        27 people recommend this
                    </Typography> */}
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

RecommendationContainer.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(RecommendationContainer);