import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import RoomListScreen from "../screens/RoomList";
import QRScannerScreen from "../screens/QRScanner";
import BookingResultScreen from "../screens/BookingResult";
const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="RoomList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RoomList"
        component={RoomListScreen}
        options={{ title: "Room Availability" }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{ title: "Scan QR Code" }}
      />
      <Stack.Screen
        name="BookingResult"
        component={BookingResultScreen}
        options={{ title: "Booking Result" }}
      />
    </Stack.Navigator>
  );
}
