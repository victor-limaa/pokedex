export type PokemonType = {
  name: string;
  url: string;
  id: number;
  types: { slot: number; type: { name: string; url: string } }[];
  sprites: any;
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
  base_experience: number;
  height: number;
  weight: number;
  species: { name: string; url: string };
  abilities: { ability: { name: string; url: string } }[];
};
