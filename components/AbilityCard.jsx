import React from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AbilityList from "./AbilityList";
import Divider from "@material-ui/core/Divider";
import MoveList from "./MoveList";
import Card from "@material-ui/core/Card";

function AbilityCard(props) {
  const {loading = false, pokemon, species} = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">Abilities</Typography>
      </CardContent>
      <AbilityList pokemon={pokemon}/>
      <Divider variant="middle"/>
      <MoveList pokemon={pokemon}/>
    </Card>
  );
}

export default AbilityCard;