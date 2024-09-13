import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PokemonType } from '@/models/Pokemon';
import { formatPokemonId } from '@/utils/formatPokemonId';
import { ArrowLeft } from 'lucide-react-native';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { PokemonPreview } from './components/PokemonPreview';
import { PokemonInfo } from './components/PokemonInfo';
import { useEffect, useRef, useState } from 'react';
import { usePokemonListStore } from '@/stores/usePokemonListStore';
import useLoadingStore from '@/stores/useLoadingStore';
import { Pokeball } from '@/components/Pokeball';
import { PokemonService } from '@/services/PokemonService';

export type PokemonScreenProps = {
  pokemonId: number;
};

export const PokemonScreen = ({ pokemonId }: PokemonScreenProps) => {
  const colors = useThemeColor();
  const [pokemon, setPokemon] = useState<PokemonType>(null);
  const [notFound, setNotFound] = useState(false);
  const { pokemonList } = usePokemonListStore((state) => state);

  const getPokemon = async () => {
    const pokemon = pokemonList.find((pokemon) => pokemon.id === pokemonId);
    if (pokemon) {
      setPokemon(pokemon);
      return;
    }
    try {
      const pokemon = await PokemonService.getPokemonById(pokemonId);
      setPokemon(pokemon);
    } catch (error) {
      setNotFound(true);
    }
  };

  useEffect(() => {
    getPokemon();
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
        <ThemedView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Pokeball />
          <ThemedText>
            {notFound ? 'Pokemon not found' : 'Loading...'}
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
