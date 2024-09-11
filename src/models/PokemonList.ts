export type PokemonListType = {
  name: string;
  url: string;
  id: number;
  types: { slot: number; type: { name: string; url: string } }[];
  sprites: { front_default: string };
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
};

export type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokemonListType[];
};

export type PokemonListPayload = {
  offset: number;
};
