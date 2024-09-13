import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCatchedStore } from '@/stores/useCatchedStore';
import { router } from 'expo-router';
import { FlatList, TouchableOpacity } from 'react-native';

export const CatchedScreen = () => {
  const { catchedPokemons } = useCatchedStore((state) => state);

  const handleNavigateToPokemon = (id: number) => {
    router.navigate({
      pathname: '/pokemon',
      params: { id },
    });
  };

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      {catchedPokemons.length ? (
        <FlatList
          data={catchedPokemons}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNavigateToPokemon(item.id)}>
              <Card
                name={item.name}
                thumb={item.sprites.other['official-artwork'].front_default}
                types={item.types}
                id={item.id}
                key={item.id}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          testID="pokemon-list"
        />
      ) : (
        <ThemedText>Not Found</ThemedText>
      )}
    </ThemedView>
  );
};
