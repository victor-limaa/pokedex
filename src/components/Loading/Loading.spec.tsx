import { render } from '@testing-library/react-native';
import { Animated } from 'react-native';
import { Loading } from '@/components/Loading';
import useLoadingStore from '@/stores/useLoadingStore';

jest.mock('@/stores/useLoadingStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Loading Component', () => {
  it('should be visible when loading is true', () => {
    (useLoadingStore as jest.Mock).mockReturnValue(true);

    const { getByTestId } = render(<Loading />);

    const modal = getByTestId('loading-modal');
    expect(modal.props.visible).toBe(true);
  });

  it('should not be visible when loading is false', () => {
    (useLoadingStore as jest.Mock).mockReturnValue(false);

    const { queryByTestId } = render(<Loading />);

    const modal = queryByTestId('loading-modal');

    expect(modal).toBeNull();
  });

  it('should animate rotation', () => {
    (useLoadingStore as jest.Mock).mockReturnValue({ isLoading: true });

    const { getByTestId } = render(<Loading />);
    const animatedView = getByTestId('loading-animated-view');

    expect(animatedView.props.style.transform[0].rotate).toBe('0deg');
  });
});
