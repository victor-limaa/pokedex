import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PokemonType } from '@/models/Pokemon';
import { formatPokemonId } from '@/utils/formatPokemonId';
import { ArrowLeft } from 'lucide-react-native';
import { Image, StyleSheet, View } from 'react-native';
import { PokemonPreview } from './components/PokemonPreview';
import { PokemonInfo } from './components/PokemonInfo';
import { useEffect } from 'react';
import useLoadingStore from '@/stores/useLoadingStore';

export type PokemonScreenProps = {
  pokemon: PokemonType;
};

export const PokemonScreen = ({ pokemon }: PokemonScreenProps) => {
  const colors = useThemeColor();
  const clearLoading = useLoadingStore((state) => state.clearLoading);

  useEffect(() => {
    clearLoading();
  }, []);

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: colors.card[pokemon.types[0].type.name] },
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
