import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your cross-platform app</Text>
      <Text style={styles.subtitle}>React Native + Expo + TypeScript</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
});

