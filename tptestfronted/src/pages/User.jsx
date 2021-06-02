import React, {useContext} from 'react'
import { AppContext } from "../components/context/AppContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import _ from "lodash"

  
  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(5, 0, 1, 10),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      marginLeft: theme.spacing(16),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));


const User = ({user}) => {
    const { games } = useContext(AppContext);
    const classes = useStyles();
    return (
        <>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Welcome {user?.displayName}
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
              At this time you are a common user and you can only see 12 games from the entire list that twich has to offer, we suggest you become a VIP
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {_.map(_.take(games, 12), card =>(
                <Grid item key={card.game._id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.game.box.large}
                      title={card.game.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.game.name}
                      </Typography>
                      <Typography>
                        Viewers: {card.viewers}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </>
    )
}

export default User
