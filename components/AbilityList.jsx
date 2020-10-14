import React from 'react';
import AbilityListItem from "./AbilityListItem";
import GridList from "@material-ui/core/GridList";

function AbilityList(props) {
  const {pokemon} = props;
  return (
    <GridList style={{minWidth: 500, marginBottom: 8}} cols={3}>
      {pokemon.abilities.map(item =>
        <AbilityListItem key={item.ability.name} ability={item.ability.name}/>
      )}
    </GridList>
  );
}

export default AbilityList;