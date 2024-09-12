import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PokemonType } from '@/models/Pokemon';
import { formatPokemonId } from '@/utils/formatPokemonId';
import { ArrowLeft } from 'lucide-react-native';
import { Image, StyleSheet, View } from 'react-native';
import { PokemonPreview } from './components/PokemonPreview';
import { PokemonInfo } from './components/PokemonInfo';
import { useEffect, useState } from 'react';
import useLoadingStore from '@/stores/useLoadingStore';
import { usePokemonListStore } from '@/stores/usePokemonListStore';

export type PokemonScreenProps = {
  pokemonId: number;
};

export const PokemonScreen = ({ pokemonId }: PokemonScreenProps) => {
  const colors = useThemeColor();
  const [pokemon, setPokemon] = useState<PokemonType>(null);
  const { pokemonList } = usePokemonListStore((state) => state);

  useEffect(() => {
    const pokemon = pokemonList.find((pokemon) => pokemon.id === pokemonId);
    if (pokemon) {
      setPokemon(pokemon);
    }
  }, [pokemonId, pokemonList]);

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor:
            colors.card[pokemon?.types?.[0].type.name] ?? colors.background,
        },
      ]}
    >
      {pokemon ? (
        <>
          <PokemonPreview pokemon={pokemon} />
          <PokemonInfo pokemon={pokemon} />
        </>
      ) : (
        <ThemedText>Not found</ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
