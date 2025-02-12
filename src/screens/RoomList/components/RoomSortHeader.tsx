import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { sizes, getColors, getColorStyles } from "@theme/index";

interface RoomSortHeaderProps {
  onSortPress: () => void;
}

export function RoomSortHeader({ onSortPress }: RoomSortHeaderProps) {
  const colors = getColors();
  const colorStyles = getColorStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.roomsHeader}>
        <Text style={[styles.label, colorStyles.textSecondary]}>Rooms</Text>
        <TouchableOpacity onPress={onSortPress} style={styles.sortButton}>
          <Text style={[styles.sortText, colorStyles.textPrimary]}>Sort</Text>
          <MaterialIcons
            name="sort"
            size={sizes.fontXl}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes.sm,
  },
  roomsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: sizes.fontXs,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.xxs,
  },
  sortText: {
    fontWeight: "bold",
    fontSize: sizes.fontXs,
  },
});
