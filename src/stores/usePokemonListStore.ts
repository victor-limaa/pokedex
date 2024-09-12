import { PokemonType } from '@/models/Pokemon';
import { storage } from '@/services/storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PokemonListStoreType = {
  pokemonList: PokemonType[];
  setPokemonList: (pokemonList: PokemonType[]) => void;
};

export const usePokemonListStore = create<PokemonListStoreType>()(
  persist(
    (set) => ({
      pokemonList: [],

      setPokemonList: (pokemonList) => {
        set((state) => ({ pokemonList }));
      },
    }),
    {
      name: 'pokemonList',
      storage: createJSONStorage(() => storage),
    },
  ),
);
