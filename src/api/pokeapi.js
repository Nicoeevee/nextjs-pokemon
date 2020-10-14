// Data fetching methods for the PokeAPI with additional random delay
import {Pokedex} from "pokeapi-js-wrapper";

// ⚠️ Note that the pokeapi-js-wrapper package caches data in IndexedDB, so if you remove
// all delay the data will resolve instantly after you have fetched it once. ⚠️
const MIN_DELAY_MS = 0;
const MAX_DELAY_MS = 0;

const P = new Pokedex();

export const testPoke = () => {
  P.resource(['/api/v2/pokemon/36', 'api/v2/berry/8', 'https://pokeapi.co/api/v2/ability/9/'])
    .then(function (response) {
      console.log(response); // resource function accepts singles or arrays of URLs/paths
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));
const randomDelay = () =>
  delay(MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS));

export const fetchPokemons = async (offset = 0) => {
  return P.getPokemonsList({
      offset,
      limit: 386
    }
  ).then(res => res.results);
};

export const fetchSpeciesByName = async name => {

  return P.getPokemonSpeciesByName(name);
}
export const fetchMoveByName = async name => {

  return P.getMoveByName(name);
}
export const fetchAbilityByName = async name => {

  return P.getAbilityByName(name);
}

export const fetchPokemonByName = async name => {

  return P.getPokemonByName(name);
};

export const fetchPokemonGames = async names => {

  return Promise.all(names.map(name => P.getVersionByName(name)));
};