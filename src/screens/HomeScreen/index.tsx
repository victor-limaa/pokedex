import { Card } from '@/components/Card';
import { Search } from '@/components/Search';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PokemonType } from '@/models/Pokemon';
import { PokemonService } from '@/services/PokemonService';
import useLoadingStore from '@/stores/useLoadingStore';
import { usePokemonListStore } from '@/stores/usePokemonListStore';
import { isLoading } from 'expo-font';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler, FlatList, TouchableOpacity } from 'react-native';

export const HomeScreen = () => {
  const { pokemonList, setPokemonList } = usePokemonListStore((state) => state);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { clearLoading, setLoading } = useLoadingStore((state) => state);
  const [filteredPokemonList, setFilteredPokemonList] = useState(pokemonList);
  const [isFiltered, setIsFiltered] = useState(false);

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
    if (hasNextPage && !isFiltered) {
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

  const handleSearch = async (text: string) => {
    if (text) {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(text.toLowerCase()),
      );
      if (!filtered.length) {
        try {
          setLoading();
          const response = await PokemonService.getPokemonByName(text);
          setFilteredPokemonList([response]);
          setIsFiltered(true);
          clearLoading();
          return;
        } catch (error) {
          setIsFiltered(false);
          clearLoading();
        }
      }
      setFilteredPokemonList(filtered);
      setIsFiltered(true);
    } else {
      setFilteredPokemonList(pokemonList);
      setIsFiltered(false);
    }
  };

  useEffect(() => {
    if (!pokemonList.length) {
      handleGetPokemonList(getPage());
    }

    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        handleSearch('');
        return true;
      },
    );

    return () => backhandler.remove();
  }, []);

  useEffect(() => {
    setFilteredPokemonList(pokemonList);
  }, [pokemonList]);

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      <ThemedView style={{ flexDirection: 'row', height: 54, width: '100%' }}>
        <Search onSearch={handleSearch} />
      </ThemedView>
      {filteredPokemonList.length ? (
        <FlatList
          data={filteredPokemonList}
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
        <ThemedText>No pokemon found</ThemedText>
      )}
    </ThemedView>
  );
};
