import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PokemonType } from '@/models/Pokemon';
import { useCatchedStore } from '@/stores/useCatchedStore';
import { formatPokemonId } from '@/utils/formatPokemonId';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export const PokemonPreview = ({ pokemon }: { pokemon: PokemonType }) => {
  const colors = useThemeColor();
  const { catchPokemon, catchedPokemons } = useCatchedStore((state) => state);

  const [isCatched, setIsCatched] = useState(
    catchedPokemons.some((catchedPokemon) => catchedPokemon.id === pokemon.id),
  );

  const handleCatchPokemon = () => {
    if (isCatched) {
      return;
    }
    catchPokemon(pokemon);
  };

  useEffect(() => {
    setIsCatched(
      catchedPokemons.some(
        (catchedPokemon) => catchedPokemon.id === pokemon.id,
      ),
    );
  }, [catchedPokemons, pokemon.id]);

  return (
    <View
      style={[
        styles.previewContainer,
        { backgroundColor: colors.card[pokemon.types[0].type.name] },
      ]}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={32} color={colors.text} />
        </Pressable>
        <TouchableOpacity
          onPress={handleCatchPokemon}
          style={styles.catchButton}
        >
          <ThemedText type="subtitle">
            {isCatched ? 'Catched' : 'Catch'}
          </ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.id}>{formatPokemonId(pokemon.id)}</ThemedText>
      </View>
      <Image
        source={{
          uri: pokemon.sprites.other['official-artwork'].front_default,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <ThemedText type="title" style={styles.pokemonName}>
        {pokemon.name}
      </ThemedText>
      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <View
            style={[styles.type, { backgroundColor: colors.backgroundOpacity }]}
          >
            <ThemedText key={type.slot} type="defaultSemiBold">
              {type.type.name}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 8,
    marginBottom: 16,
  },
  id: {
    fontSize: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  pokemonName: {
    textTransform: 'capitalize',
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
  },
  type: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  catchButton: {
    width: 140,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -70 }],
  },
});
