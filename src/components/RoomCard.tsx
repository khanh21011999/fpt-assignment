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

export function RoomCard({
  name,
  level,
  capacity,
  isAvailable,
}: RoomCardProps) {
  const colors = getColors();
  const colorStyles = getColorStyles(colors);

  const containerStyle = [styles.container, colorStyles.backgroundCard];

  const availabilityStyle = [
    styles.availabilityTag,
    {
      backgroundColor: isAvailable
        ? colors.available + "20"
        : colors.unavailable + "20",
    },
  ];

  return (
    <View style={containerStyle} testID="room-card">
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={[styles.roomName, colorStyles.textPrimary]}>{name}</Text>
          <Text style={[styles.levelText, colorStyles.textSecondary]}>
            Level {parseInt(level)}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <View style={availabilityStyle}>
            <Text
              style={[
                styles.statusText,
                isAvailable ? colorStyles.available : colorStyles.unavailable,
              ]}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </Text>
          </View>
          <Text style={[styles.capacityText, colorStyles.textSecondary]}>
            {parseInt(capacity)} Pax
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes.md,
    paddingHorizontal: sizes.lg,
    marginVertical: sizes.xs,
    borderRadius: sizes.radiusMd,
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
    fontSize: sizes.fontLg,
    fontWeight: "700",
    marginBottom: sizes.xs,
  },
  levelText: {
    fontSize: sizes.fontSm,
    opacity: 0.8,
  },
  availabilityTag: {
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.xxs,
    borderRadius: sizes.radiusFull,
    marginBottom: sizes.xs,
  },
  statusText: {
    fontSize: sizes.fontXs,
    fontWeight: "600",
  },
  capacityText: {
    fontSize: sizes.fontSm,
    opacity: 0.8,
  },
});
