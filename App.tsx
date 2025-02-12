import React, { useEffect } from "react";
import {
  Appearance,
  StatusBar,
  SafeAreaView,
  View,
  useColorScheme,
} from "react-native";
import { colors } from "@theme/colors";

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "@navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getStatusBarHeight } from "@utils/statusBar";
import { useNetwork } from "@hooks/useNetwork";

export default function App() {
  // Initialize network monitoring
  useNetwork();

  const scheme = useColorScheme();
  const themeColors = colors[scheme === "dark" ? "dark" : "light"];

  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          animated
          backgroundColor={themeColors.background}
          barStyle={scheme === "dark" ? "light-content" : "dark-content"}
        />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </View>
  );
}
