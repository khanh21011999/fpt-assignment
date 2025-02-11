import { StyleSheet } from "react-native";
import { sizes } from "./sizes";

// Create reusable styles that can be imported directly
export const styles = StyleSheet.create({
  // Container styles
  container: {
    padding: sizes.md,
    borderRadius: sizes.radiusMd,
    marginHorizontal: sizes.md,
    marginVertical: sizes.xxs,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flex: 1,
  },
  alignRight: {
    alignItems: "flex-end",
  },

  // Text styles
  titleText: {
    fontSize: sizes.fontMd,
    fontWeight: "600",
    marginBottom: sizes.xxs,
  },
  bodyText: {
    fontSize: sizes.fontSm,
  },
  labelText: {
    fontSize: sizes.fontSm,
    marginBottom: sizes.xxs,
    fontStyle: "italic",
  },

  // Common spacing
  gap4: { gap: sizes.xxs },
  gap8: { gap: sizes.xs },
  gap16: { gap: sizes.md },
  margin4: { margin: sizes.xxs },
  margin8: { margin: sizes.xs },
  margin16: { margin: sizes.md },
  padding4: { padding: sizes.xxs },
  padding8: { padding: sizes.xs },
  padding16: { padding: sizes.md },
});

// Export a function to get dynamic color styles
export const getColorStyles = (
  colors: ReturnType<typeof import("./colors").getColors>
) =>
  StyleSheet.create({
    backgroundPrimary: {
      backgroundColor: colors.background,
    },
    backgroundCard: {
      backgroundColor: colors.card,
    },
    textPrimary: {
      color: colors.textPrimary,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    available: {
      color: colors.available,
    },
    unavailable: {
      color: colors.unavailable,
    },
  });
