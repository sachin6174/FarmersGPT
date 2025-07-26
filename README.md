# FarmersGPT Mobile App

Mobile version of the Project Kisan web application - an AI-powered farming solution for Indian agriculture.

## Features

- **Crop Diagnosis**: Take photos of plants and get AI-powered disease diagnosis
- **Market Prices**: Real-time crop price information 
- **AI Assistant**: Chat with an AI assistant in Kannada language
- **User-friendly Interface**: Clean, mobile-optimized design

## Tech Stack

- **React Native** with Expo
- **JavaScript/React Hooks** for state management
- **Native APIs** for camera and image picker
- Cross-platform (iOS & Android)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development on Mac)

### Installation

1. Navigate to the mobile app directory:
```bash
cd FarmersGPT
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on device/emulator:
```bash
# For Android
npm run android

# For iOS
npm run ios

# For web preview
npm run web
```

## App Structure

```
FarmersGPT/
├── App.js                 # Main app component with navigation
├── package.json          # Dependencies and scripts
├── app.json             # Expo configuration
└── assets/              # Images and icons
```

## Main Components

### Home Screen
- Hero section with app overview
- Feature cards for quick access
- Statistics display
- Navigation to other screens

### Diagnosis Screen
- Camera integration for plant photos
- AI analysis simulation
- Results display with treatment recommendations
- Kannada language support

### Market Prices Screen
- List of crops with current prices
- Price trends and changes
- Interactive crop selection

### AI Assistant Screen
- Chat interface
- Kannada language examples
- Voice input placeholder
- Bilingual support

## Integration with Web App

The mobile app is designed to work with the existing web app API endpoints:

- `/api/diagnose` - Image analysis for crop diseases
- `/api/satellite-data` - Agricultural data
- `/api/multimodal-analysis` - AI assistant functionality

## Development Notes

- Uses React Native StyleSheet for styling
- Implements tab-based navigation
- Responsive design for different screen sizes
- Modular component structure for maintainability

## Future Enhancements

- Real camera integration with expo-camera
- Voice recognition for Kannada input
- Offline mode capabilities
- Push notifications for price alerts
- Weather integration
- GPS-based soil data

## Deployment

### For Production Builds:

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

### Publishing to App Stores:

1. Configure app.json with proper app store metadata
2. Generate signed APK/IPA files
3. Submit to Google Play Store / Apple App Store

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## License

This project is part of the Project Kisan agricultural platform.