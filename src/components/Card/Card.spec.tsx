import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from '@/components/Card';
import { useThemeColor } from '@/hooks/useThemeColor';
import { formatPokemonId } from '@/utils/formatPokemonId';

// Mock das funções e hooks
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));
jest.mock('@/utils/formatPokemonId', () => ({
  formatPokemonId: jest.fn(),
}));

const defaultProps = {
  name: 'bulbasaur',
  thumb:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  types: [
    { slot: 1, type: { name: 'grass', url: 'some-url' } },
    { slot: 2, type: { name: 'poison', url: 'some-url' } },
  ],
  id: 1,
};

describe('Card Component', () => {
  beforeEach(() => {
    (useThemeColor as jest.Mock).mockReturnValue({
      card: { grass: 'green', poison: 'purple' },
      backgroundOpacity: '#333333',
    });

    (formatPokemonId as jest.Mock).mockReturnValue('#001');
  });

  it('should render the Card component with correct name and ID', () => {
    const { getByText } = render(<Card {...defaultProps} />);

    expect(getByText('bulbasaur')).toBeTruthy();
    expect(getByText('#001')).toBeTruthy();
  });

  it('should display all Pokemon types', () => {
    const { getByText } = render(<Card {...defaultProps} />);

    expect(getByText('grass')).toBeTruthy();
    expect(getByText('poison')).toBeTruthy();
  });

  it('should display the Pokemon image', () => {
    const { getByTestId } = render(<Card {...defaultProps} />);

    const image = getByTestId('pokemon-image');
    expect(image.props.source.uri).toBe(defaultProps.thumb);
  });
});
