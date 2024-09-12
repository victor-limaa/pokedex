import { PokemonScreen } from '@/screens/PokemonScreen';
import { useLocalSearchParams } from 'expo-router';

export default function Pokemon({ navigation }: any) {
  const { pokemon } = useLocalSearchParams();
  const pokemonObj = JSON.parse(pokemon);

  return <PokemonScreen pokemon={pokemonObj} />;
}
