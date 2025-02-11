import { Platform, StatusBar } from "react-native";

export const getStatusBarHeight = (): number => {
  return Platform.OS === "ios" ? 44 : StatusBar.currentHeight ?? 0;
};
