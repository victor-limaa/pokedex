import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PokemonType } from '@/models/Pokemon';
import { PokemonService } from '@/services/PokemonService';
import useLoadingStore from '@/stores/useLoadingStore';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

export const HomeScreen = () => {
  const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { clearLoading, setLoading, isLoading } = useLoadingStore(
    (state) => state,
  );

  const handleGetPokemonList = async () => {
    try {
      if (!hasNextPage) {
        return;
      }

      setLoading();
      const data = await PokemonService.getPokemonList({
        offset: page * 10,
      });
      setHasNextPage(data.next !== null);
      setPokemonList((prev) => [...prev, ...data.results]);
      clearLoading();
    } catch (error) {
      console.error(error);
      clearLoading();
    }
  };

  const onEndReached = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handleNavigateToPokemon = (pokemon: PokemonType) => {
    setLoading();
    router.push({
      pathname: '/pokemon',
      params: { pokemon: JSON.stringify(pokemon) },
    });
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
            <TouchableOpacity onPress={() => handleNavigateToPokemon(item)}>
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
