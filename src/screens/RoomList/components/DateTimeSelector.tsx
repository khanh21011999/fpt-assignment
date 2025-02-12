import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { sizes, getColors, getColorStyles } from "@theme/index";
import DatePicker from "react-native-date-picker";

interface DateTimeSelectorProps {
  selectedDateTime: Date;
  onDateTimeChange: (date: Date) => void;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
}

export function DateTimeSelector({
  selectedDateTime,
  onDateTimeChange,
  formatDate,
  formatTime,
}: DateTimeSelectorProps) {
  const colors = getColors();
  const colorStyles = getColorStyles(colors);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const colorScheme = useColorScheme();

  const getMinMaxTime = () => {
    const today = new Date();
    const minTime = new Date(today);
    minTime.setHours(8, 0, 0);
    const maxTime = new Date(today);
    maxTime.setHours(19, 30, 0);
    return { minTime, maxTime };
  };

  const { minTime, maxTime } = getMinMaxTime();

  const handleDateConfirm = (date: Date) => {
    setIsDatePickerOpen(false);
    const newDateTime = new Date(selectedDateTime);
    newDateTime.setFullYear(date.getFullYear());
    newDateTime.setMonth(date.getMonth());
    newDateTime.setDate(date.getDate());
    onDateTimeChange(newDateTime);
  };

  const handleTimeConfirm = (date: Date) => {
    setIsTimePickerOpen(false);
    const newDateTime = new Date(selectedDateTime);
    newDateTime.setHours(date.getHours());
    newDateTime.setMinutes(date.getMinutes());
    onDateTimeChange(newDateTime);
  };

  const containerStyle = [styles.container];

  return (
    <View style={containerStyle}>
      <View style={styles.sectionContainer}>
        <Text style={[styles.label, colorStyles.textSecondary]}>Date</Text>
        <Pressable
          onPress={() => setIsDatePickerOpen(true)}
          style={styles.valueContainer}
        >
          <Text style={[styles.value, colorStyles.textPrimary]}>
            {formatDate(selectedDateTime)}
          </Text>
          <View style={[styles.iconContainer, colorStyles.backgroundCard]}>
            <Feather
              name="edit-2"
              size={14}
              color={colors.unavailable}
              style={[styles.icon]}
            />
          </View>
        </Pressable>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.textSecondary + "40" },
          ]}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[styles.label, colorStyles.textSecondary]}>Time</Text>
        <Pressable
          onPress={() => setIsTimePickerOpen(true)}
          style={styles.valueContainer}
        >
          <Text style={[styles.value, colorStyles.textPrimary]}>
            {formatTime(selectedDateTime)}
          </Text>
          <View style={[styles.iconContainer, colorStyles.backgroundCard]}>
            <Feather
              name="edit-2"
              size={14}
              color={colors.unavailable}
              style={[styles.icon]}
            />
          </View>
        </Pressable>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.textSecondary + "40" },
          ]}
        />
      </View>

      <DatePicker
        modal
        open={isDatePickerOpen}
        date={selectedDateTime}
        onConfirm={handleDateConfirm}
        onCancel={() => setIsDatePickerOpen(false)}
        mode="date"
        theme={colorScheme === "dark" ? "dark" : "light"}
        minimumDate={new Date()}
      />

      <DatePicker
        modal
        open={isTimePickerOpen}
        date={selectedDateTime}
        onConfirm={handleTimeConfirm}
        onCancel={() => setIsTimePickerOpen(false)}
        mode="time"
        theme={colorScheme === "dark" ? "dark" : "light"}
        minuteInterval={30}
        minimumDate={minTime}
        maximumDate={maxTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: sizes.xs,

    borderRadius: 12,
    padding: sizes.xxs,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {},
  container: {
    marginBottom: sizes.lg,
    borderRadius: sizes.radiusMd,
    padding: sizes.md,
  },
  sectionContainer: {
    marginBottom: sizes.lg,
  },
  label: {
    fontSize: sizes.fontSm,
    marginBottom: sizes.xs,
    opacity: 0.7,
  },
  value: {
    fontSize: sizes.fontLg,
    fontWeight: "600",
    marginTop: sizes.xxs,
  },
  divider: {
    height: 1,
    marginTop: sizes.sm,
    opacity: 0.2,
  },
});
