import { useColorScheme } from "react-native";

export const colors = {
  light: {
    background: "#FFFFFF",
    card: "#F5F5F5",
    textPrimary: "#333333",
    textSecondary: "#C0C5CD",
    textAccent: "#5975E0",
    available: "#4CAF50",
    unavailable: "#A0A0A0",
  },
  dark: {
    background: "#121212",
    card: "#1E1E1E",
    textPrimary: "#FFFFFF",
    textSecondary: "#A0A0A0",
    textAccent: "#7B9CFF",
    available: "#4CAF50",
    unavailable: "#616161",
  },
} as const;

export const getColors = () => {
  const scheme = useColorScheme();

  return colors[scheme === "dark" ? "dark" : "light"];
};
