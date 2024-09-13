import { render, waitFor, screen } from '@testing-library/react-native';
import { PokemonScreen } from '@/screens/PokemonScreen';
import { usePokemonListStore } from '@/stores/usePokemonListStore';
import { PokemonService } from '@/services/PokemonService';
import { Pokeball } from '@/components/Pokeball';

jest.mock('@/stores/usePokemonListStore', () => ({
  usePokemonListStore: jest.fn(),
}));

jest.mock('@/services/PokemonService');

jest.mock('@/components/Pokeball', () => ({
  Pokeball: () => <div>Pokeball</div>,
}));

describe('PokemonScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display Pokémon info when found in the list', async () => {
    const mockPokemon = {
      id: 1,
      name: 'Bulbasaur',
      sprites: {
        other: { 'official-artwork': { front_default: 'url-bulbasaur' } },
      },
      types: [{ type: { name: 'grass' } }],
    };

    usePokemonListStore.mockReturnValue({
      pokemonList: [mockPokemon],
    });

    const { getByText } = render(<PokemonScreen pokemonId={1} />);

    await waitFor(() => {
      expect(getByText('Bulbasaur')).toBeTruthy();
    });
  });

  it('should display "Pokemon not found" message when Pokémon is not found and an error occurs', async () => {
    usePokemonListStore.mockReturnValue({
      pokemonList: [],
    });

    PokemonService.getPokemonById.mockRejectedValueOnce(
      new Error('Pokemon not found'),
    );

    const { getByText } = render(<PokemonScreen pokemonId={9999} />);

    await waitFor(() => {
      expect(getByText('Pokemon not found')).toBeTruthy();
    });
  });

  it('should display "Loading..." message while data is being fetched', async () => {
    usePokemonListStore.mockReturnValue({
      pokemonList: [],
    });

    (PokemonService.getPokemonById as jest.Mock).mockResolvedValueOnce({
      id: 1,
      name: 'Bulbasaur',
      sprites: {
        other: { 'official-artwork': { front_default: 'url-bulbasaur' } },
      },
      types: [{ type: { name: 'grass' } }],
    });

    const { getByText } = render(<PokemonScreen pokemonId={1} />);

    expect(getByText('Loading...')).toBeTruthy();
  });
});
