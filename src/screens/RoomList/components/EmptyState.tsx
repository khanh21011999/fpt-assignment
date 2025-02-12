import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getColors, getColorStyles, sizes, styles } from "@theme/index";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "No rooms available for selected time",
}: EmptyStateProps) {
  const colors = getColors();
  const colorStyles = getColorStyles(colors);

  return (
    <View style={[styles.container, localStyles.container]}>
      <MaterialIcons
        name="meeting-room"
        size={sizes.xxl}
        color={colors.textSecondary}
      />
      <Text
        style={[
          colorStyles.textSecondary,
          { fontSize: sizes.fontLg, textAlign: "center", marginTop: sizes.md },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: sizes.xl,
  },
});
