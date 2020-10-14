import React, {useEffect, useState} from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import GridListTile from "@material-ui/core/GridListTile";
import Tooltip from "@material-ui/core/Tooltip";
import Skeleton from "@material-ui/lab/Skeleton";
import {fetchAbilityByName} from "../src/api/pokeapi";
import {toFirstCharUppercase} from "../src/constants";

const useMove = name => {
    const [ability, setAbility] = useState(null);

    useEffect(() => {
        setAbility(null);

        if (!name) return;
        fetchAbilityByName(name).then(species => {
            setAbility(species);
        });
    }, [name]);

    return ability;
};

function AbilityListItem(props) {
    const {ability} = props;
    const data = useMove(ability);
    return (
        <GridListTile cols={1}>
            <Tooltip arrow title={
                !ability ? null : !data ? (
                    <Skeleton animation="wave"/>
                ) : data.flavor_text_entries.find(value => value.language.name === "zh-Hans")?.flavor_text.replace(/[\r\n]/g, "")
            }>
                <ListItem button>
                    <ListItemText primary={toFirstCharUppercase(ability)}
                                  secondary={
                                      !ability ? null : !data ? (
                                          <Skeleton animation="wave"/>
                                      ) : data.names.find(value => value.language.name === "zh-Hans").name + ' 0pp'
                                  }
                    />
                </ListItem>
            </Tooltip>
        </GridListTile>
    );
}


export default AbilityListItem;