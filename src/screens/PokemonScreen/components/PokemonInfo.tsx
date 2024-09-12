import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PokemonType } from '@/models/Pokemon';
import { ScrollView, StyleSheet, View } from 'react-native';

export const PokemonInfo = ({ pokemon }: { pokemon: PokemonType }) => {
  const colors = useThemeColor();

  const formatStat = (statName: string) => {
    switch (statName) {
      case 'special-attack':
        return 'Sp. Attack';

      case 'special-defense':
        return 'Sp. Defense';

      default:
        return statName;
        break;
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
    >
      <View style={styles.info}>
        <ThemedText type="defaultSemiBold">Species</ThemedText>
        <ThemedText>{pokemon.species.name}</ThemedText>
      </View>
      <View style={styles.info}>
        <ThemedText type="defaultSemiBold">Abilities</ThemedText>
        <View style={styles.abilities}>
          {pokemon.abilities.map((ability, index) => (
            <ThemedText
              key={ability.ability.name}
              style={{ textTransform: 'capitalize' }}
            >
              {ability.ability.name}
              {index < pokemon.abilities.length - 1 && ', '}
            </ThemedText>
          ))}
        </View>
      </View>
      {pokemon.stats.map((stat) => (
        <View style={styles.info} key={stat.stat.name}>
          <ThemedText
            type="defaultSemiBold"
            style={{ textTransform: 'capitalize' }}
          >
            {formatStat(stat.stat.name)}
          </ThemedText>
          <ThemedText>{stat.base_stat}</ThemedText>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  info: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  abilities: {
    flexDirection: 'row',
    gap: 8,
  },
});
