import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PokemonListType } from '@/models/PokemonList';
import { PokemonService } from '@/services/PokemonService';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

export const HomeScreen = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListType[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const handleGetPokemonList = async () => {
    try {
      if (!hasNextPage) {
        return;
      }
      const data = await PokemonService.getPokemonList({
        offset: page * 10,
      });
      setHasNextPage(data.next !== null);
      setPokemonList((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.error(error);
    }
  };

  const onEndReached = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    handleGetPokemonList();
  }, [page]);

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      <ThemedText>Home Screen</ThemedText>
      {pokemonList.length ? (
        <FlatList
          data={pokemonList}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              thumb={item.sprites.front_default}
              types={item.types}
              id={item.id}
              key={item.id}
            />
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          testID="pokemon-list"
        />
      ) : (
        <ThemedText>Not Found</ThemedText>
      )}
    </ThemedView>
  );
};
