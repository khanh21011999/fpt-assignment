import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";
import { getStatusBarHeight } from "./src/utils/statusBar";
import { useNetwork } from "./src/hooks/useNetwork";

export default function App() {
  // Initialize network monitoring
  useNetwork();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" backgroundColor="transparent" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </View>
  );
}
