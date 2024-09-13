import { SpeciesService } from './';
import apiClient from '../apiClient';

jest.mock('../apiClient', () => ({
  get: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('SpeciesService', () => {
  it('should getSpecie', async () => {
    const mockData = {
      name: 'pikachu',
      id: 25,
      egg_groups: ['monster', 'eletric'],
    };
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const result = await SpeciesService.getSpecie(25);

    expect(apiClient.get).toHaveBeenCalledWith('/pokemon-species/25');
    expect(result).toEqual(mockData);
  });

  it('should throw an error when the API request fails', async () => {
    const errorMessage = 'Network Error';
    (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(SpeciesService.getSpecie(25)).rejects.toThrow(errorMessage);
  });
});
