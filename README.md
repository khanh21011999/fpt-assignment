# FPT Assignment - Room Booking App

A React Native mobile application for room booking built with Expo, for assigmment 

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- Package manager (e.g., [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/)). Bun is recommended for its speed and efficiency.
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/) (for iOS development)
- [Android Studio and Android SDK](https://docs.expo.dev/workflow/android-studio-emulator/) (for Android development)
- [Expo Go](https://expo.dev/client) (for running on physical devices)

## Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/12929e30-1924-4db0-9784-47cc38f6084b" alt="Screenshot 1" width="300"></td>
    <td><img src="https://github.com/user-attachments/assets/1deb734f-9ca6-4b10-9da2-4b5f10a64b3a" alt="Screenshot 2" width="300"></td>
  </tr>
</table>

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd fpt-assignment
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun start
```

4. Run on your preferred platform:

- For iOS:

```bash
bun ios
```

- For Android:

```bash
bun android
```

## Running Tests

This project uses Jest for testing. There are several ways to run the tests:

```bash
# Run tests once
bun test

# Run tests in watch mode (recommended during development)
bun test:watch

# Run tests with coverage report
bun test:coverage
```

The coverage report will be generated in the `coverage` directory. You can view the detailed HTML report by opening `coverage/lcov-report/index.html` in your browser.

## Available Scripts

- `bun start` - Start the Expo development server
- `bun ios` - Run on iOS simulator
- `bun android` - Run on Android emulator
- `bun test` - Run Jest tests once
- `bun test:watch` - Run Jest tests in watch mode
- `bun test:coverage` - Run tests with coverage report

## Project Structure

```
src/
├── api/          # API client and configuration
├── components/   # Reusable components
├── navigation/   # Navigation configuration
├── screens/      # Screen components
├── theme/        # Theme configuration
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## Troubleshooting

If you encounter any issues:

1. Clear Metro bundler cache:

```bash
bun start --clear
```
3. Clean install dependencies:

```bash
rm -rf node_modules
rm bun.lock
bun install
```
