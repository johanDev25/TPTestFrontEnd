import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartLoading, eventStartDelete } from '../actions/games';
import _ from "lodash";
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

const Favorites = ({user}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { games } = useSelector( state => state.games );

    useEffect(() => {

        dispatch( eventStartLoading() );

    }, [ dispatch, games ])

    const deleteGame = (game) => {
        dispatch( eventStartDelete(game.id) );
    }

    return (
        <>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Favorites of {user?.displayName}
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Your game library will allow you to go directly to the link where you can see each of your games added to your list of disfutals favorites, Watch when ever you want
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {games?.map((card) => (
                <Grid item key={card.id} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.linkImage}
                      title={card.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>
                      <a target='_blank' rel="noreferrer" href={"https://www.twitch.tv/directory/game/" +  card.name} >Watch on Twich</a>
                      </Typography>
                    </CardContent>
                    <CardActions> 
                      <Button size="small" color="primary" onClick={() => deleteGame(card)}>
                      Delete Favorite
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

export default Favorites
