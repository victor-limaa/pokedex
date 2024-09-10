import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
export default function TabTwoScreen() {
  const color = useThemeColor();

  return (
    <ThemedView style={styles.titleContainer}>
      <Text>Explore</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
