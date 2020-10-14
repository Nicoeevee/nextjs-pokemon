import React, {useState} from "react";
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Grid from "@material-ui/core/Grid";
import {toFirstCharLowercase} from "../src/constants";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {fade} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import PokemonListItem from "../components/PokemonListItem";
import {fetchPokemons} from "../src/api/pokeapi";
import Fab from "@material-ui/core/Fab";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import {useRouter} from "next/router";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  fabRoot: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
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
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

}));

function ScrollTop(props) {
  const {children, window} = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.fabRoot}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Index(props) {
  const {pokemons} = props;
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const handleSearchChange = (e) => {
    setFilter(toFirstCharLowercase(e.target.value));
  };
  const router = useRouter()
  return (
    <React.Fragment>
      <Head>
        <title>{`Apo-Pokemon ${Object.keys(pokemons).length}`}</title>
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
            >
              <MenuIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Apo-Pokemon
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                onChange={handleSearchChange}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{"aria-label": "search"}}
              />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div id="back-to-top-anchor" className={classes.offset}/>
      <Container className={classes.body}>
        {
          pokemons ?
            <Grid container spacing={2}>
              {
                Object.keys(pokemons).map(
                  (pokemonId) => {
                    let pokemon = pokemons[pokemonId];
                    return pokemon.name.includes(filter) &&
                      (
                        <Grid item sm={2} xs={6} md={2} lg={2} key={pokemon.id}>
                          <PokemonListItem
                            pokemon={pokemon}
                            loading={!pokemons}
                            onClick={() => router.push(`/pokemons/${pokemon.name}`)}
                          />
                        </Grid>
                      );
                  }
                )
              }
            </Grid>
            : <Grid container spacing={2}>
              {
                Array.from(Array(386).keys()).map((value, index) => {
                    return <Grid item sm={2} xs={6} md={2} lg={2} key={index}>
                      <PokemonListItem loading/>
                    </Grid>
                  }
                )
              }
            </Grid>
        }
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" aria-label="scroll back to top">
          <KeyboardArrowUpIcon/>
        </Fab>
      </ScrollTop>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip/>
      <Copyright/>
    </React.Fragment>

  );
}

export async function getStaticProps() {
  let pokemons = {};

  pokemons = await fetchPokemons().then(function (data) {
    const newPokemonData = {};
    data.forEach((pokemon, index) => {
      newPokemonData[index + 1] = {
        id: index + 1,
        name: pokemon.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      };
    })
    return newPokemonData;
  });
  return {
    props: {
      pokemons
    }
  }
  // const allPokemonsData = {};
  // data.forEach((pokemon, index) => {
  //   allPokemonsData[index + 1] = {
  //     id: index + 1,
  //     name: pokemon.name,
  //     sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
  //       index + 1
  //     }.png`,
  //   };
  // })
  // return {
  //   props: {
  //     allPokemonsData
  //   }
  // }
}
