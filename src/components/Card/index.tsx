import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { formatPokemonId } from '@/utils/formatPokemonId';

export type CardProps = {
  name: string;
  thumb: string;
  types: { slot: number; type: { name: string; url: string } }[];
  id: number;
};

export const Card = ({ name, thumb, types, id }: CardProps) => {
  const colors = useThemeColor();

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: colors.card[types[0].type.name] },
      ]}
      testID="pokemon-card"
    >
      <View style={styles.info}>
        <View>
          <ThemedText style={{ color: colors.backgroundOpacity }}>
            {formatPokemonId(id)}
          </ThemedText>
          <ThemedText style={styles.name}>{name}</ThemedText>
        </View>
        <View style={styles.typeRow}>
          {types &&
            types.map((type) => (
              <View
                style={[
                  styles.type,
                  { backgroundColor: colors.backgroundOpacity },
                ]}
              >
                <ThemedText style={{ color: 'white' }} key={type.slot}>
                  {type.type.name}
                </ThemedText>
              </View>
            ))}
        </View>
      </View>
      <Image
        testID="pokemon-image"
        source={{ uri: thumb }}
        style={styles.image}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120,
    position: 'absolute',
    right: 0,
  },
  container: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 8,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 120,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  type: {
    height: 24,
    paddingHorizontal: 16,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  name: { textTransform: 'capitalize', fontSize: 20, color: 'white' },
});
