import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PokemonType } from '@/models/Pokemon';
import { PokemonService } from '@/services/PokemonService';
import useLoadingStore from '@/stores/useLoadingStore';
import { usePokemonListStore } from '@/stores/usePokemonListStore';
import { isLoading } from 'expo-font';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

export const HomeScreen = () => {
  const { pokemonList, setPokemonList } = usePokemonListStore((state) => state);
  // const [page, setPage] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { clearLoading, setLoading } = useLoadingStore((state) => state);

  const handleGetPokemonList = async (page: number) => {
    try {
      if (!hasNextPage) {
        return;
      }

      setLoading();
      const data = await PokemonService.getPokemonList({
        offset: page * 10,
      });
      setHasNextPage(data.next !== null);
      setPokemonList([...pokemonList, ...data.results]);
      clearLoading();
    } catch (error) {
      console.error(error);
      clearLoading();
    }
  };

  const getPage = () => {
    if (pokemonList.length) {
      if (pokemonList.length === 10) {
        return 1;
      }
      return pokemonList.length / 10;
    }
    return 0;
  };

  const onEndReached = () => {
    if (hasNextPage) {
      const page = getPage();
      handleGetPokemonList(page);
    }
  };

  const handleNavigateToPokemon = (id: number) => {
    router.navigate({
      pathname: '/pokemon',
      params: { id },
    });
  };

  useEffect(() => {
    if (!pokemonList.length) {
      handleGetPokemonList(getPage());
    }
  }, []);

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      <ThemedText>Home Screen</ThemedText>
      {pokemonList.length ? (
        <FlatList
          data={pokemonList}
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
