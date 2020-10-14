import CardActionArea from "@material-ui/core/CardActionArea";
import {Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {toFirstCharUppercase} from "../src/constants";
import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Skeleton from "@material-ui/lab/Skeleton";

export default function PokemonListItem(props) {
    const {loading} = props;
    return (
        <Card onClick={props.onClick}>
            <CardActionArea>
                {
                    loading ?
                        <Skeleton variant="rect" height={96}/>
                        :
                        <CardMedia
                            component="img"
                            alt={`${(props.pokemon.name)}`}
                            image={props.pokemon.sprite}
                            title={`${(props.pokemon.id)}. ${(props.pokemon.name)}`}
                            style={{width: "96px", height: "96px", margin: "auto"}}
                        />
                }
                <CardContent>
                    <Typography variant="h5">
                        {loading ? <Skeleton/>
                            : toFirstCharUppercase(props.pokemon.name)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {loading ? <Skeleton/>
                            : `${(props.pokemon.id)}`.padStart(3, '0')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}