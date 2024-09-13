import { fireEvent, render } from '@testing-library/react-native';
import { Search } from '@/components/Search';
import { ThemedView } from '@/components/ThemedView';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: () => ({
    border: '#ccc',
    text: '#000',
    placeholder: '#999',
    icon: '#000',
  }),
}));

describe('Search Component', () => {
  it('should render correctly with placeholder text', () => {
    const onSearchMock = jest.fn();
    const { getByPlaceholderText } = render(<Search onSearch={onSearchMock} />);

    const input = getByPlaceholderText('Search');
    expect(input).toBeTruthy();
  });

  it('should call onSearch when submitted', () => {
    const onSearchMock = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <Search onSearch={onSearchMock} />,
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'Pikachu');
    fireEvent(input, 'submitEditing');

    expect(onSearchMock).toHaveBeenCalledWith('Pikachu');
  });

  it('should call onSearch when search icon is pressed', () => {
    const onSearchMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <Search onSearch={onSearchMock} />,
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'Bulbasaur');
    const button = getByTestId('search-button');
    fireEvent.press(button);

    expect(onSearchMock).toHaveBeenCalledWith('Bulbasaur');
  });
});
