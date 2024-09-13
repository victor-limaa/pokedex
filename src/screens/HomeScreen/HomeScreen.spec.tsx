import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '@/screens/HomeScreen';
import { usePokemonListStore } from '@/stores/usePokemonListStore';
import { PokemonService } from '@/services/PokemonService';
import { router } from 'expo-router';

jest.mock('@/stores/usePokemonListStore', () => ({
  usePokemonListStore: jest.fn(),
}));

jest.mock('@/services/PokemonService', () => ({
  getPokemonList: jest.fn(),
  getPokemonByName: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    usePokemonListStore.mockReturnValue({
      pokemonList: [],
      setPokemonList: jest.fn(),
    });
  });

  it('should render a list of pokemons when available', async () => {
    const mockPokemonList = [
      {
        id: 1,
        name: 'Bulbasaur',
        sprites: {
          other: { 'official-artwork': { front_default: 'url-bulbasaur' } },
        },
        types: [{ type: { name: 'grass' } }],
      },
    ];

    usePokemonListStore.mockReturnValue({
      pokemonList: mockPokemonList,
      setPokemonList: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('Bulbasaur')).toBeTruthy();
    });
  });

  it('should call the search function and filter pokemon list', async () => {
    const mockPokemonList = [
      {
        id: 1,
        name: 'Bulbasaur',
        sprites: {
          other: { 'official-artwork': { front_default: 'url-bulbasaur' } },
        },
        types: [{ type: { name: 'grass' } }],
      },
      {
        id: 2,
        name: 'Charmander',
        sprites: {
          other: { 'official-artwork': { front_default: 'url-charmander' } },
        },
        types: [{ type: { name: 'fire' } }],
      },
    ];

    usePokemonListStore.mockReturnValue({
      pokemonList: mockPokemonList,
      setPokemonList: jest.fn(),
    });

    const { getByPlaceholderText, queryByText } = render(<HomeScreen />);

    fireEvent.changeText(getByPlaceholderText('Search'), 'Bulbasaur');
    fireEvent(getByPlaceholderText('Search'), 'submitEditing');

    await waitFor(() => {
      expect(queryByText('Bulbasaur')).toBeTruthy();
      expect(queryByText('Charmander')).toBeNull();
    });
  });

  it('should navigate to the selected pokemon details', async () => {
    const mockPokemonList = [
      {
        id: 1,
        name: 'Bulbasaur',
        sprites: {
          other: { 'official-artwork': { front_default: 'url-bulbasaur' } },
        },
        types: [{ type: { name: 'grass' } }],
      },
    ];

    usePokemonListStore.mockReturnValue({
      pokemonList: mockPokemonList,
      setPokemonList: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);
    const pokemonCard = getByText('Bulbasaur');

    fireEvent.press(pokemonCard);

    await waitFor(() => {
      expect(router.navigate).toHaveBeenCalledWith({
        pathname: '/pokemon',
        params: { id: 1 },
      });
    });
  });

  it('should display "No pokemon found" if the list is empty', () => {
    usePokemonListStore.mockReturnValue({
      pokemonList: [],
      setPokemonList: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);

    expect(getByText('No pokemon found')).toBeTruthy();
  });
});
