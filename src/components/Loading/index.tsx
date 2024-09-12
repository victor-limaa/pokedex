import { Animated, Easing, Modal } from 'react-native';
import { ThemedView } from '../ThemedView';
import { Pokeball } from '../Pokeball';
import useLoadingStore from '@/stores/useLoadingStore';
import { useEffect, useRef } from 'react';

export const Loading = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const rotation = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  };

  useEffect(() => {
    startRotation();
  }, []);

  return (
    <Modal transparent visible={isLoading}>
      <ThemedView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        >
          <Pokeball />
        </Animated.View>
      </ThemedView>
    </Modal>
  );
};
