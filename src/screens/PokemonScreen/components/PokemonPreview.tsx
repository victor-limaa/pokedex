import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PokemonType } from '@/models/Pokemon';
import { formatPokemonId } from '@/utils/formatPokemonId';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';

export const PokemonPreview = ({ pokemon }: { pokemon: PokemonType }) => {
  const colors = useThemeColor();
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
});
