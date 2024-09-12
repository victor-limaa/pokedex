import { PokemonScreen } from '@/screens/PokemonScreen';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

export default function Pokemon() {
  const { id } = useLocalSearchParams();

  return <PokemonScreen pokemonId={parseInt(id)} />;
}
