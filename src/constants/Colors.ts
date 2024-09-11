const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export type ColorsKeys = {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  border: string;
  backgroundOpacity: string;
  card: any;
};

const pokemonCardBackgroundColors = {
  normal: '#A8A77A',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#11181C',
    backgroundOpacity: 'rgba(21, 23, 24, 0.3)',
    card: pokemonCardBackgroundColors,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#ECEDEE',
    backgroundOpacity: 'rgba(255, 255, 255, 0.3)',
    card: pokemonCardBackgroundColors,
  },
};
