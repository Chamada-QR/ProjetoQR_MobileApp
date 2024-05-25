import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { useColorScheme } from 'react-native'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'
import { theme as DarkTheme } from './DarkTheme'
import { theme as LightTheme } from './LightTheme'

export const useTheme = () => {
  const colorScheme = useColorScheme()

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: DarkTheme.colors }
      : { ...MD3LightTheme, colors: LightTheme.colors }

  return paperTheme
}
