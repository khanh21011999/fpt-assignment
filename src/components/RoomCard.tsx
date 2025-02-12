import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getColorStyles, getColors, sizes } from "@theme/index";

interface RoomCardProps {
  name: string;
  level: string;
  capacity: string;
  isAvailable: boolean;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes.md,
    paddingHorizontal: sizes.lg,
    marginVertical: sizes.xxs,
    borderRadius: sizes.sm,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSection: {
    flex: 1,
    justifyContent: "space-between",
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  roomName: {
    fontSize: sizes.fontMd,
    fontWeight: "600",
    marginBottom: sizes.xs,
  },
  levelText: {
    fontSize: sizes.fontSm,
  },
  statusText: {
    fontSize: sizes.fontSm,
    fontStyle: "italic",
    marginBottom: sizes.xs,
  },
  capacityText: {
    fontSize: sizes.fontSm,
  },
});

export function RoomCard({
  name,
  level,
  capacity,
  isAvailable,
}: RoomCardProps) {
  const colors = getColors();
  const colorStyles = getColorStyles(colors);
  const statusText = isAvailable ? "Available" : "Not Available";

  return (
    <View
      style={[styles.container, colorStyles.backgroundCard]}
      testID="room-card"
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={[styles.roomName, colorStyles.textPrimary]}>{name}</Text>
          <Text style={[styles.levelText, colorStyles.textPrimary]}>
            Level {parseInt(level)}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text
            style={[
              styles.statusText,
              isAvailable ? colorStyles.available : colorStyles.unavailable,
            ]}
          >
            {statusText}
          </Text>
          <Text style={[styles.capacityText, colorStyles.textPrimary]}>
            {parseInt(capacity)} Pax
          </Text>
        </View>
      </View>
    </View>
  );
}
