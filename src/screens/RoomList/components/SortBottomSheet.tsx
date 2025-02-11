import React, { useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { getColors } from "../../../theme";

interface SortBottomSheetProps {
  onClose: () => void;
  onApply: (sortOption: string) => void;
  onReset: () => void;
  currentSortOption: string;
}

export const SortBottomSheet = React.forwardRef<
  BottomSheet,
  SortBottomSheetProps
>(({ onClose, onApply, onReset, currentSortOption }, ref) => {
  const colors = getColors();
  const [selectedOption, setSelectedOption] =
    React.useState<string>(currentSortOption);

  // Update selected option when currentSortOption changes
  React.useEffect(() => {
    setSelectedOption(currentSortOption);
  }, [currentSortOption]);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.5}
      pressBehavior="close"
    />
  );

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      onClose();
    }
  };

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
  };

  const handleApply = () => {
    onApply(selectedOption);
    onClose();
  };

  const handleReset = () => {
    setSelectedOption("");
    onReset();
    onClose();
  };

  const renderOption = (option: string) => {
    const isSelected = selectedOption === option;
    return (
      <TouchableOpacity
        key={option}
        style={[styles.optionContainer, { borderColor: colors.textSecondary }]}
        onPress={() => handleOptionPress(option)}
      >
        <Text
          style={[
            styles.optionText,
            { color: isSelected ? colors.textAccent : colors.textPrimary },
          ]}
        >
          {option}
        </Text>
        <View
          style={[
            styles.radioButton,
            {
              borderColor: isSelected
                ? colors.textAccent
                : colors.textSecondary,
              backgroundColor: isSelected ? colors.textAccent : "transparent",
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: colors.background }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Sort</Text>

        {["level", "capacity", "availability"].map((option) =>
          renderOption(option.charAt(0).toUpperCase() + option.slice(1))
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.resetButton,
              { borderColor: colors.textSecondary },
            ]}
            onPress={handleReset}
          >
            <Text style={[styles.buttonText, { color: colors.textPrimary }]}>
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.applyButton,
              { backgroundColor: colors.textAccent },
            ]}
            onPress={handleApply}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: 24,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  resetButton: {
    marginRight: 12,
    borderWidth: 1,
  },
  applyButton: {
    marginLeft: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
