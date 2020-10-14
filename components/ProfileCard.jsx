import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import {toFirstCharUppercase} from "../src/constants";


const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));

const ProfileCard = (props) => {
  const {loading = false, pokemon, species} = props;
  const classes = useStyles();
  const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
  return (
    <Card>
      <CardActionArea>
        {loading ?
          <Skeleton variant="rect" height={300}/>
          :
          <CardMedia
            component="img"
            alt={pokemon.name}
            image={fullImageUrl}
            style={{width: "300px", height: "300px", margin: "auto", padding: "16px"}}
            title={pokemon.name}
          />}
        <Grid container spacing={2}>
          {loading ?
            <Skeleton variant="rect" height={96}/>
            :
            <CardMedia
              component="img"
              alt={pokemon.name}
              image={pokemon.sprites.front_default}
              style={{width: "96px", height: "96px", margin: "auto"}}
              title={pokemon.name}
            />}
          {loading ?
            <Skeleton variant="rect" height={96}/>
            :
            <CardMedia
              className={classes.media}
              component="img"
              alt={pokemon.name}
              image={pokemon.sprites.back_default}
              style={{width: "96px", height: "96px", margin: "auto"}}
              title={pokemon.name}
            />}

        </Grid>
        <CardContent>
          <Typography variant="h5" component="h2">
            {toFirstCharUppercase(pokemon.name)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {loading ? <Skeleton/>
              : species !== undefined && species &&
              species.names.find(value => value.language.name === "zh-Hans")?.name
              + ' · '
              + species.genera.find(value => value.language.name === "zh-Hans")?.genus}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {loading ? <Skeleton/>
              : species !== undefined && species &&
              species.flavor_text_entries.find(value => value.language.name === "zh-Hans")?.flavor_text.replace(/[\r\n]/g, "")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider variant="middle"/>
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">Types</Typography>
        <div>
          {pokemon.types.map(data => (
            <Chip key={data.slot}
                  onClick={() => {
                  }}
                  className={classes.chip}
                  label={toFirstCharUppercase(data.type.name)}>
            </Chip>
          ))}
        </div>
      </div>
      <CardActions className={classes.section3}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default ProfileCard
