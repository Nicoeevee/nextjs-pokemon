import React from 'react';
import MoveListItem from "./MoveListItem";
import GridList from "@material-ui/core/GridList";

function MoveList(props) {
  const {pokemon} = props;
  return (
    <GridList style={{minWidth: 0, maxHeight: 550, marginTop: 8}} cols={2} spacing={2}>
      {pokemon.moves.map(item =>
        <MoveListItem key={item.move.name} move={item.move.name}/>
      )}
    </GridList>
  );
}

export default MoveList;