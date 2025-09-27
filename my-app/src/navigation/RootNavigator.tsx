import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { ThemeProvider, useThemeContext } from '../theme/ThemeContext';

enableScreens(true);

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator(): React.ReactElement {
  const { navigationTheme } = useThemeContext();
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function RootNavigator(): React.ReactElement {
  return (
    <ThemeProvider>
      <StackNavigator />
    </ThemeProvider>
  );
}

