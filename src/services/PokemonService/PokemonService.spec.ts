import { PokemonService } from './'; // ajustar para o path correto
import apiClient from '../apiClient';

jest.mock('../apiClient', () => ({
  get: jest.fn(),
}));

describe('PokemonService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemonByName', () => {
    it('should fetch pokemon data by name', async () => {
      const mockData = { name: 'pikachu', id: 25 };
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const result = await PokemonService.getPokemonByName('pikachu');

      expect(apiClient.get).toHaveBeenCalledWith('/pokemon/pikachu');
      expect(result).toEqual(mockData);
    });

    it('should fetch pokemon data by id', async () => {
      const mockData = { name: 'bubasaur', id: 1 };
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const result = await PokemonService.getPokemonById(1);

      expect(apiClient.get).toHaveBeenCalledWith('/pokemon/1');
      expect(result).toEqual(mockData);
    });

    it('should throw an error when the API request fails', async () => {
      const errorMessage = 'Network Error';
      (apiClient.get as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(PokemonService.getPokemonByName('pikachu')).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe('getPokemonList', () => {
    it('should fetch pokemon list with offset', async () => {
      const mockPokemonList = {
        results: [{ name: 'pikachu' }],
        data: { count: 1 },
      };
      const mockPokemonData = { name: 'pikachu', id: 25 };

      (apiClient.get as jest.Mock)
        .mockResolvedValueOnce({ data: mockPokemonList })
        .mockResolvedValueOnce({ data: mockPokemonData });

      const result = await PokemonService.getPokemonList({ offset: 0 });

      expect(apiClient.get).toHaveBeenCalledWith('/pokemon', {
        params: { limit: '10', offset: 0 },
      });
      expect(result.results).toEqual([mockPokemonData]);
      expect(result.count).toBe(1);
    });

    it('should throw an error when fetching the pokemon list fails', async () => {
      const errorMessage = 'Network Error';
      (apiClient.get as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(
        PokemonService.getPokemonList({ offset: 0 }),
      ).rejects.toThrow(errorMessage);
    });
  });
});
