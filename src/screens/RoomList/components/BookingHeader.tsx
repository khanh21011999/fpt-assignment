import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getColorStyles, getColors, sizes } from "@theme/index";
import { Appearance } from "react-native";

interface BookingHeaderProps {
  onCameraPress: () => void;
}

export function BookingHeader({ onCameraPress }: BookingHeaderProps) {
  const colors = getColors();
  const colorStyles = getColorStyles(colors);
  const colorScheme = useColorScheme();

  const toggleTheme = () => {
    const newScheme = colorScheme === "dark" ? "light" : "dark";
    Appearance.setColorScheme(newScheme);
  };

  return (
    <View style={styles.titleRow}>
      <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
        <Ionicons
          name={colorScheme === "dark" ? "sunny-outline" : "moon-outline"}
          size={sizes.xxl}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, colorStyles.textPrimary]}>Book a Room</Text>
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={onCameraPress}>
        <Ionicons
          name="camera-outline"
          size={sizes.xxl}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: sizes.lg,
    paddingHorizontal: sizes.md,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: sizes.fontMd,
    fontWeight: "bold",
  },
  iconButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
