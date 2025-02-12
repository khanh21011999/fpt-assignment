import React, { useRef, useState } from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { getColors, getColorStyles } from "@theme/index";
import { RoomListScreenProps } from "./types";
import { RoomListContent } from "./components";
import { useDateTimeSelection } from "./hooks/useDateTimeSelection";
import { useRoomData } from "./hooks/useRoomData";
import { SortBottomSheet } from "./components/SortBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { getStatusBarHeight } from "@utils/statusBar";
export default function RoomListScreen({ navigation }: RoomListScreenProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [currentSortOption, setCurrentSortOption] = useState<string>("");
  const colors = getColors();
  const colorStyles = getColorStyles(colors);

  const { selectedDateTime, onDateTimeChange, formatDate, formatTime } =
    useDateTimeSelection();

  const { rooms, isLoading, handleSortRooms } = useRoomData(selectedDateTime);

  const handleSortPress = () => {
    bottomSheetRef.current?.expand();
    setIsSortSheetOpen(true);
  };

  const handleSortClose = () => {
    setIsSortSheetOpen(false);
    bottomSheetRef.current?.close();
  };

  const handleSortApply = (sortOption: string) => {
    setCurrentSortOption(sortOption);
    handleSortRooms(sortOption.toLowerCase());
    handleSortClose();
  };

  const handleSortReset = () => {
    setCurrentSortOption("");
    handleSortRooms();
    handleSortClose();
  };

  const statusBarHeight = getStatusBarHeight();

  return (
    <SafeAreaView style={[styles.container, colorStyles.backgroundPrimary]}>
      <RoomListContent
        rooms={rooms}
        isLoading={isLoading}
        headerProps={{
          selectedDateTime,
          onDateTimeChange,
          formatDate,
          formatTime,
          onCameraPress: () => navigation.navigate("QRScanner"),
          onSortPress: handleSortPress,
        }}
      />

      <SortBottomSheet
        ref={bottomSheetRef}
        onClose={handleSortClose}
        onApply={handleSortApply}
        onReset={handleSortReset}
        currentSortOption={currentSortOption}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
