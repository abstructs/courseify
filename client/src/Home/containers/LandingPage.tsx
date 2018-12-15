import * as React from 'react';
import { Typography, Grid, Paper, withStyles, Card, CardMedia, CardContent, Button, Theme, createStyles } from '@material-ui/core';

const headerImage = require('../../images/book.jpeg');

const styles: any = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

interface PropTypes {
  classes: {
    root: string,
    card: string,
    media: string,
    button: string,
    paper: string
  }
}

class LandingPage extends React.Component<PropTypes, {}> {
  render(): React.ReactNode {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper style={{height: "300px", paddingLeft: "10%", backgroundImage: "url(" + headerImage +")", backgroundPosition: "0px 800px"}} className={classes.paper}>
              <Typography style={{marginTop: "100px", color: "white"}} align="left" variant="display2" gutterBottom>Welcome to Courseify.</Typography>
              <Typography style={{color: "white"}} align="left" variant="headline" gutterBottom>We’re about finding you the <b>right</b> resources.</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography style={{marginTop: "50px", color: "black"}} align="center" variant="display1" gutterBottom>Three reasons to try Courseify</Typography>
          </Grid>

          <Grid container spacing={24} style={{padding: "50px"}}>
            <Grid item md={4}>
              <Card className={classes.card} style={{minHeight: "150px"}}>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    The Best Resources
                  </Typography>
                  <Typography component="p">
                    Courseify is a platform where the people you know can store their recommendations, 
                    so you know who to trust.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={4}>
              <Card className={classes.card} style={{minHeight: "150px"}}>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    Your People
                  </Typography>
                  <Typography component="p">
                    We're empowered by the people who empower you. We know how hard it is to cut 
                    through the bullshit and get to the content that can really make a difference.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={4}>
              <Card className={classes.card} style={{minHeight: "150px"}}>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    Discuss What Matters
                  </Typography>
                  <Typography component="p">
                  Feel free to message whoever made a recommendation, we believe it's important to being 
                  able to discuss with the people you're getting advice from.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Button href="/signup" style={{margin: "auto", marginTop: "15px"}} variant="contained" size="large" color="primary" className={classes.button}>
            Get Started
          </Button>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
