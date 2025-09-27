## Cross-platform mobile app (Expo + React Native + TypeScript)

### Prerequisites
- Node.js 18+ and npm
- Android: Android Emulator or a device with Expo Go
- iOS (optional, requires macOS): Xcode Simulator or Expo Go on iPhone

### Install dependencies
```bash
npm install
```

### Run the app
```bash
npm run start
# or
npm run android
npm run ios   # macOS only
npm run web
```

### Features
- Stack navigation with `Home` and `Settings`
- Light/Dark theme with persistence via `AsyncStorage`

### Project structure
```
src/
  navigation/
    RootNavigator.tsx
  screens/
    HomeScreen.tsx
    SettingsScreen.tsx
  theme/
    ThemeContext.tsx
```

### Notes
- The theme follows system preference initially, and toggles via Settings.
- iOS building requires macOS; use Expo Go on-device otherwise.

