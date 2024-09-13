import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PokemonType } from '@/models/Pokemon';
import { SpeciesService } from '@/services/SpeciesService';
import useLoadingStore from '@/stores/useLoadingStore';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

export const PokemonInfo = ({ pokemon }: { pokemon: PokemonType }) => {
  const colors = useThemeColor();
  const [eggGroups, setEggGroups] = useState<{ name: string }[]>([]);
  const { setLoading, clearLoading } = useLoadingStore((state) => state);

  const getEggGroup = async () => {
    if (pokemon) {
      try {
        setLoading();
        const data = await SpeciesService.getSpecie(pokemon.id);
        setEggGroups(data.egg_groups);
        clearLoading();
      } catch (error) {
        clearLoading();
      }
    }
  };

  const formatStat = (statName: string) => {
    switch (statName) {
      case 'special-attack':
        return 'Sp. Attack';

      case 'special-defense':
        return 'Sp. Defense';

      default:
        return statName;
    }
  };

  useEffect(() => {
    getEggGroup();
  }, [pokemon]);

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
        <View style={styles.row}>
          {eggGroups.map((group, index) => (
            <ThemedText
              key={group.name}
              style={{ textTransform: 'capitalize', textAlign: 'right' }}
            >
              {group.name}
              {index < eggGroups.length - 1 && ', '}
            </ThemedText>
          ))}
        </View>
      </View>
      <View style={styles.info}>
        <ThemedText type="defaultSemiBold">Abilities</ThemedText>
        <View style={styles.row}>
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
  row: {
    flexDirection: 'row',
    gap: 8,
    width: '50%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
});
