export const formatPokemonId = (id: number) => {
  return `#${id.toString().padStart(3, '0')}`;
};
