/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors, ColorsKeys } from '@/constants/Colors';

export function useThemeColor(): ColorsKeys {
  const theme = useColorScheme() ?? 'light';

  return Colors[theme];
}
