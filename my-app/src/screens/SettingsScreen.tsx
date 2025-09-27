import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useThemeContext } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen(_props: Props) {
  const { currentTheme, toggleTheme } = useThemeContext();
  const isDark = currentTheme === 'dark';
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Dark mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <Text style={styles.hint}>Theme is persisted between launches.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
  },
  hint: {
    opacity: 0.6,
  },
});

