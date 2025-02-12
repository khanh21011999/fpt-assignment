import React from "react";
import { View } from "react-native";
import { getColorStyles, getColors } from "@theme/index";
import { RoomSortHeader } from "./RoomSortHeader";
import { DateTimeSelector } from "./DateTimeSelector";
import { BookingHeader } from "./BookingHeader";

interface RoomListHeaderProps {
  selectedDateTime: Date;
  onDateTimeChange: (date: Date) => void;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
  onCameraPress: () => void;
  onSortPress: () => void;
}

export function RoomListHeader({
  selectedDateTime,
  onDateTimeChange,
  formatDate,
  formatTime,
  onCameraPress,
  onSortPress,
}: RoomListHeaderProps) {
  const colors = getColors();
  const colorStyles = getColorStyles(colors);

  return (
    <View style={colorStyles.backgroundPrimary}>
      <BookingHeader onCameraPress={onCameraPress} />

      <DateTimeSelector
        selectedDateTime={selectedDateTime}
        onDateTimeChange={onDateTimeChange}
        formatDate={formatDate}
        formatTime={formatTime}
      />
      <RoomSortHeader onCameraPress={onCameraPress} onSortPress={onSortPress} />
    </View>
  );
}
