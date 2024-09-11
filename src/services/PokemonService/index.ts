import { PokemonListPayload, PokemonListResponse } from '@/models/PokemonList';
import apiClient from '../apiClient';

const getPokemonList = async ({
  offset,
}: PokemonListPayload): Promise<PokemonListResponse> => {
  try {
    const response = await apiClient.get('/pokemon', {
      params: {
        limit: '10',
        offset,
      },
    });
    const { results, data } = response.data;

    const pokemons = await results.map(async (pokemon: any) => {
      const pokemonData = await getPokemonByName(pokemon.name);
      return pokemonData;
    });

    return {
      ...data,
      results: await Promise.all(pokemons),
    };
  } catch (error) {
    throw error;
  }
};

const getPokemonByName = async (name: string) => {
  try {
    const response = await apiClient.get(`/pokemon/${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PokemonService = {
  getPokemonList,
  getPokemonByName,
};
