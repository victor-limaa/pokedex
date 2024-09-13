import { render, fireEvent } from '@testing-library/react-native';
import { CatchedScreen } from '@/screens/CatchedScreen';
import { useCatchedStore } from '@/stores/useCatchedStore';
import { router } from 'expo-router';

jest.mock('@/stores/useCatchedStore', () => ({
  useCatchedStore: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

describe('CatchedScreen', () => {
  it('should display "Not Found" when there are no catched pokemons', () => {
    useCatchedStore.mockReturnValue({
      catchedPokemons: [],
    });

    const { getByText } = render(<CatchedScreen />);

    expect(getByText('No catched pokemons')).toBeTruthy();
  });

  it('should render a list of catched pokemons', () => {
    useCatchedStore.mockReturnValue({
      catchedPokemons: [
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
      ],
    });

    const { getByText } = render(<CatchedScreen />);

    expect(getByText('Bulbasaur')).toBeTruthy();
    expect(getByText('Charmander')).toBeTruthy();
  });

  it('should navigate to the selected pokemon details', () => {
    useCatchedStore.mockReturnValue({
      catchedPokemons: [
        {
          id: 1,
          name: 'Bulbasaur',
          sprites: {
            other: { 'official-artwork': { front_default: 'url-bulbasaur' } },
          },
          types: [{ type: { name: 'grass' } }],
        },
      ],
    });

    const { getByText } = render(<CatchedScreen />);
    const pokemonCard = getByText('Bulbasaur');

    fireEvent.press(pokemonCard);

    expect(router.navigate).toHaveBeenCalledWith({
      pathname: '/pokemon',
      params: { id: 1 },
    });
  });
});
