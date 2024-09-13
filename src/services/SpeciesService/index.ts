import { SpecieType } from '@/models/Species';
import apiClient from '../apiClient';

const getSpecie = async (id: number): Promise<SpecieType> => {
  try {
    const response = await apiClient.get(`/pokemon-species/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SpeciesService = {
  getSpecie,
};
