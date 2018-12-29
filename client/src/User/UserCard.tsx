
import * as React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// const styles = {
//     root: {
//         flexGrow: 1
//     }
// }

interface IUser {
    username: string,
    headline: string,
    first_name: string,
    last_name: string,
    country: string,
    summary: string
}

interface IPropTypes {
    // classes: {
    //     media: string,
    //     card: string,
    // },
    user: IUser
}

class UserCard extends React.Component<IPropTypes, {}>{

    constructor(props: IPropTypes) {
        super(props);
    }

    render() {
        const {  user } = this.props;

        // className={classes.card}
        // className={classes.media}

        return (
            <Card style={{margin: "20px"}} >
                <CardMedia
  
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {user.first_name} {user.last_name} 
                    </Typography>
                    <Typography gutterBottom variant="subheading">
                        is a {user.headline} from {user.country}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Summary
                    </Typography>
                    <Typography>
                        {user.summary}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={`/profile/${user.username}`} size="small" color="primary">
                        Check Out Their Profile
                    </Button>
                    <Button size="small" color="primary">
                        Message
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default UserCard;