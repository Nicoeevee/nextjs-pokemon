import React from 'react';
import MoveListItem from "./MoveListItem";
import GridList from "@material-ui/core/GridList";

function MoveList(props) {
    const {pokemon} = props;
    return (
        <GridList style={{maxWidth: 500, maxHeight: 450, marginTop: 8}} cols={3} spacing={2}>
            {pokemon.moves.map(item =>
                <MoveListItem key={item.move.name} move={item.move.name}/>
            )}
        </GridList>
    );
}

export default MoveList;