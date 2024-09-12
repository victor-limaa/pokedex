import { PokemonType } from './Pokemon';

export type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokemonType[];
};

export type PokemonListPayload = {
  offset: number;
};
