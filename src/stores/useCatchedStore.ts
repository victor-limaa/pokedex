import { PokemonType } from '@/models/Pokemon';
import { storage } from '@/services/storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CatchedStoreType = {
  catchedPokemons: PokemonType[];
  catchPokemon: (newPokemon: PokemonType) => void;
};

export const useCatchedStore = create<CatchedStoreType>()(
  persist(
    (set) => ({
      catchedPokemons: [],

      catchPokemon: (newPokemon: PokemonType) => {
        set((state: CatchedStoreType) => ({
          catchedPokemons: [...state.catchedPokemons, newPokemon],
        }));
      },
    }),
    {
      name: 'catched-pokemons',
      storage: createJSONStorage(() => storage),
    },
  ),
);
