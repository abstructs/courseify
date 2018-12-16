import  * as React from 'react';
// import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import VideosContainer from './VideosContainer.js';
// import Auth from '../Auth';

// import LandingPage from './LandingPage';
import { withStyles, List, ListItem, ListItemText, Grid, Paper, Typography, } from '@material-ui/core';
// ExpansionPanelSummary, ExpansionPanel, Card, CardMedia, CardContent, CardActions, Button, Paper, ListItemIcon
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import UserCard from '../../User/UserCard';
// import RecommendationCard from '../../Recommendation/RecommendationCard';
// Icons
// import InboxIcon from '@material-ui/icons/Inbox';
// import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ViewListIcon from '@material-ui/icons/ViewList';
import { RecommendationService } from 'src/Services/RecommendationService';
import UserCard from 'src/User/UserCard';
import { UserService, IUser } from 'src/Services/UserService';
// import UserCard from 'src/User/UserCard';

// const teacherImage = require('../images/laptop.jpeg');

const styles = {
    root: {
        flexGrow: 1,
    //   width: '100%',
    //   maxWidth: 360,
    //   backgroundColor: theme.palette.background.paper,
    }
}

// class HomeRecommendations extends Component {
    
// }
                

                    {/* <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>General settings</Typography>
                            <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                            maximus est, id dignissim quam.
                            </Typography>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Users</Typography>
                            <Typography className={classes.secondaryHeading}>
                            You are currently not an owner
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                            diam eros in elit. Pellentesque convallis laoreet laoreet.
                            </Typography>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Advanced settings</Typography>
                            <Typography className={classes.secondaryHeading}>
                            Filtering has been entirely disabled for whole web server
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                            eros, vitae egestas augue. Duis vel est augue.
                            </Typography>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Personal data</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                            eros, vitae egestas augue. Duis vel est augue.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel> */}
                {/* </Grid>
            </Grid> */}
        

        
          {/* <div className="bg-dark border-0 pt-5 pb-5" style={{backgroundImage: "url(" + teacherImage +")", backgroundPosition: "250px 660px"}}>
            <div className="container">
              <h2 className="text-light font-weight-light">Welcome back, Andrew</h2><br/>
              <h4 className="text-light font-weight-light">Ready to have your socks knocked off,<br/> with some new resources?</h4>
              <br/>
              <a href="#courses" className="btn pr-5 pl-5 text-white" style={{backgroundColor: "#ff6000"}}>Let's Take A Look</a>
            </div>
          </div>
  
          <section id="reasons" className="bg-light pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 p-5">
                <h4 className="text-center font-weight-light"><b>Recommendations</b></h4>
                {this.state.recommendations.map(recommendation => {
                  console.log(recommendation)
                  return (
                    <div>
                      <p className="text-center"><a target="_blank" href={recommendation.url}>{recommendation.title} by {recommendation.author}.</a></p>
                    </div>
                  );
                })}
              </div>
              <div className="col-xl-4 p-5">
                <h4 className="text-center font-weight-light"><b>New Users</b></h4>
                {this.state.users.map(user => {
                  console.log(user)
                  return (
                    <div>
                      <p className="text-center">Welcome {user.first_name + " " + user.last_name}!</p>
                    </div>
                  );
                })}
              </div>
              <div className="col-xl-4 p-5">
                <h4 className="text-center font-weight-light"><b>Featured Courses</b></h4>
              </div>
            </div>
          </section> */}
          {/* </div> */}

enum ITab {
    People = "People",
    Recommendation = "Recommendation"
}

interface IPropTypes {
    classes: {
        root: string
    }
}

interface IStateTypes {
    tab: ITab,
    users: Array<any>,
    recommendations: Array<any>;
}

class HomePage extends React.Component<IPropTypes, IStateTypes> {

    private recommendationService: RecommendationService;
    private userService: UserService;

    constructor(props: IPropTypes) {
        super(props);

        this.state = {
              recommendations: [],
            users: [],
            tab: ITab.People
        }

        this.recommendationService = new RecommendationService();
        this.userService = new UserService();
    }

//   handleChange = panel => (event, expanded) => {
//     this.setState({
//       expanded: expanded ? panel : false,
//     });
//   };

    componentDidMount() {
        this.recommendationService.getAll((recommendataions) => {

        });

        this.userService.getAll((users: Array<IUser>) => {
            this.setState({
                users
            });
        });
    // axios.get(`${process.env.REACT_APP_API_URL}/api/v1/recommendations`)
    // .then(res => {
    //   const recommendations = res.data.recommendations;

    //   axios.get(`${process.env.REACT_APP_API_URL}/v1/users`)
    //   .then(res => {
    //     const users = res.data.users;

    //     // this.setState({ recommendations, users });
    //   })
      
    // })
  }

//   handleTabClick(e, tab) {
//     this.setState({ tab });
//   }

  render() {
    const { classes } = this.props;
    // const { expanded } = this.state;

    return (
        <div className={classes.root}>      
            <Grid container spacing={40}>     
                <Grid item xs={4}> 
                    <List component="nav">
                        <ListItem button>
                        {/* (e) => this.handleTabClick(e, "people") */}
                            {/* <ListItemIcon>
                                <ViewListIcon />
                            </ListItemIcon> */}
                            <ListItemText primary="New People" />
                        </ListItem>
                        {/* <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem> */}
                        {/* <ListItem button onClick={(e) => this.handleTabClick(e, "recommendation")}>
                            <ListItemIcon>
                                <LibraryBooksIcon />
                            </ListItemIcon>
                            <ListItemText primary="Recommendations" />
                        </ListItem> */}
                    </List>
                </Grid>
                <Grid item md={5}>


                    { this.state.tab == ITab.Recommendation ?
                        <div>
                            <Typography style={{marginTop: "50px", color: "black"}} align="center" variant="display1">
                                Recommendations
                            </Typography>
                            {this.state.recommendations.map(recommendation => {

                                console.log(recommendation)

                                // return (
                                //     <RecommendationCard recommendation={recommendation} />
                                // )
                                return <div></div>;
                            })}
                        </div>
                    :
                    <div></div>
                    }

                    {  this.state.tab == ITab.People ? 
                            <Paper style={{paddingTop: "20px", paddingBottom: "20px", marginTop: "20px"}}>
                                <div>
                                    <Typography style={{marginTop: "50px", color: "black"}} align="center" variant="display1">
                                        New People
                                    </Typography>
                                        {this.state.users.map((user: any) => {
                                            console.log(user);

                                            return <UserCard user={user}></UserCard>;
                                        })}
                                </div>
                            </Paper>
                        :
                            <div></div>
                    }
                </Grid>
            </Grid>

            <Grid container spacing={40}>

            </Grid>
        </div>
      );
  }
}

export default withStyles(styles)(HomePage);



    