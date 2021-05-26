import React, {useContext} from 'react'
import { AppContext } from "../components/context/AppContext";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import {  eventStartAddNew } from '../actions/games';



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



const UserVIP = ({user}) => {
  const classes = useStyles();
const dispatch = useDispatch();
    const { games } = useContext(AppContext);
   

    const gamesAdd = (game) =>  {
      const data = {
        name: game.game.name,
        linkImage: game.game.box.large
      }
      dispatch( eventStartAddNew(data) );
    }
    
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
              Thanks for contributing and helping us as a VIP user you will be able to see all the games that twich has for you, just add to your favorites and enjoy them
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {games?.map((card) => (
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
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => gamesAdd(card)}>
                      Add to Favorite
                    </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </>
    )
}

export default UserVIP
