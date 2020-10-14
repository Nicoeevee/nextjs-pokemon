import React, {useEffect, useState} from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import GridListTile from "@material-ui/core/GridListTile";
import Tooltip from "@material-ui/core/Tooltip";
import Skeleton from "@material-ui/lab/Skeleton";
import {fetchMoveByName} from "../src/api/pokeapi";
import {toFirstCharUppercase} from "../src/constants";

const useMove = name => {
    const [move, setMove] = useState(null);

    useEffect(() => {
        setMove(null);

        if (!name) return;
        fetchMoveByName(name).then(species => {
            setMove(species);
        });
    }, [name]);

    return move;
};

function MoveListItem(props) {
    const {move} = props;
    const data = useMove(move)
    return (
        <GridListTile cols={1}>
            <Tooltip arrow title={
                !move ? null : !data ? (
                    <Skeleton animation="wave"/>
                ) : data.flavor_text_entries.find(value => value.language.name === "zh-Hans")?.flavor_text.replace(/[\r\n]/g, "")
                // +'\n命中'+data.accuracy
                // +'威力'+data.power
                // +'pp'+data.pp
            }>
                <ListItem button>
                    <ListItemText primary={toFirstCharUppercase(move)}
                                  secondary={
                                      !move ? null : !data ? (
                                          <Skeleton animation="wave"/>
                                      ) : data.names.find(value => value.language.name === "zh-Hans").name + ' ' + data.pp + 'pp'
                                  }
                    />
                </ListItem>
            </Tooltip>
        </GridListTile>
    );
}

export default MoveListItem;