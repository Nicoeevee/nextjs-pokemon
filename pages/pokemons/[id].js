import React from "react";
import {fetchPokemonByName, fetchPokemons, fetchSpeciesByName} from "../../src/api/pokeapi";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProfileCard from "../../components/ProfileCard";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {toFirstCharUppercase} from "../../src/constants";
import LinearProgress from "@material-ui/core/LinearProgress";
import AbilityList from "../../components/AbilityList";
import Divider from "@material-ui/core/Divider";
import MoveList from "../../components/MoveList";
import {useRouter} from "next/router";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  appbarContainer: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  body: {
    padding: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'block',
  },

}));
export default function Pokemon({pokemon, species}) {
  const classes = useStyles();
  const router = useRouter()

  return <React.Fragment>
    <Head>
      <title>{toFirstCharUppercase(pokemon.name)}</title>
    </Head>
    <CssBaseline/>
    <Box className={classes.appbarContainer}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => router.push("/")}>
            <ArrowBackIcon/>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {toFirstCharUppercase(pokemon.name)}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <div id="back-to-top-anchor" className={classes.offset}/>
    <Container className={classes.body}>
        <Grid
          container spacing={2}
          direction="row"
          justify="center"
          alignItems="flex-start">
          <Grid item xs> <ProfileCard pokemon={pokemon} species={species} loading={!species}/>
          </Grid>
          <Grid item xs container>
            <Grid item container direction="column" spacing={2}>
              <Grid item xs>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">Stats</Typography>
                  </CardContent>
                  <List component="nav">
                    {pokemon.stats.map(data => (
                      <div key={data.stat.name}>
                        <ListItem button>
                          <ListItemText primary={toFirstCharUppercase(data.stat.name)}/>
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                              <Typography variant="body2">
                                {data.base_stat}
                              </Typography>
                            </IconButton>

                          </ListItemSecondaryAction>
                        </ListItem>
                        <LinearProgress variant="determinate"
                                        value={Math.min(Math.max(0, data.base_stat), 100)}
                                        style={{margin: '0 16px 0 16px', height: '2px'}}
                        />
                      </div>
                    ))}
                  </List>
                </Card>
              </Grid>
              <Grid item xs>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">Info</Typography>
                  </CardContent>
                  <List>
                    <ListItem button>
                      <ListItemText primary={'Height'}/>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <Typography variant="body2">
                            {pokemon.height}
                          </Typography>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary={'Weight'}/>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <Typography variant="body2">
                            {pokemon.weight}
                          </Typography>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary={'Color'}/>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <Typography variant="body2">
                            {species.color.name}
                          </Typography>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary={'Base happiness'}/>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <Typography variant="body2">
                            {`${species.base_happiness}/255`}
                          </Typography>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary={'Capture Rate'}/>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <Typography variant="body2">
                            {`${species.capture_rate}/255`}
                          </Typography>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary={'Gender Rate'}/>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <Typography variant="body2">
                            {species.gender_rate}
                          </Typography>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary={'Hatch Counter'}/>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <Typography variant="body2">
                            {species.hatch_counter}
                          </Typography>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">Abilities</Typography>
              </CardContent>
              <AbilityList pokemon={pokemon}/>
              <Divider variant="middle"/>
              <MoveList pokemon={pokemon}/>
            </Card>
          </Grid>
          <Grid item xs>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">Game Indices</Typography>
              </CardContent>
              <List style={{maxHeight: 500, overflow: 'auto',}}>
                {pokemon.game_indices.map(data => (
                  <ListItem button key={data.version.name}>
                    <ListItemText primary={toFirstCharUppercase(data.version.name)}/>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
    </Container>
  </React.Fragment>
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetchPokemons()
  // Get the paths we want to pre-render based on posts
  const paths = res.map((data) => ({
    params: {id: data.name},
  }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  // Fetch necessary data for the blog post using params.id
  // Add the "await" keyword like this:
  const pokemon = await fetchPokemonByName(params.id)
  const species = await fetchSpeciesByName(pokemon.id)
  return {
    props: {
      pokemon,
      species
    }
  }
}