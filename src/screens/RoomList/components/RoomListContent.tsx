import React from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Room } from "../types";
import { sizes, getColors, getColorStyles } from "@theme/index";
import { RoomCard } from "@components/RoomCard";
import { RoomListHeader } from "./RoomListHeader";
import { EmptyState } from "./EmptyState";

interface RoomListContentProps {
  rooms: Room[];
  isLoading: boolean;
  headerProps: React.ComponentProps<typeof RoomListHeader>;
}

export function RoomListContent({
  rooms,
  isLoading,
  headerProps,
}: RoomListContentProps) {
  const colors = getColors();
  const colorStyles = getColorStyles(colors);

  return (
    <FlatList
      data={rooms}
      style={colorStyles.backgroundPrimary}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RoomCard
          name={item.name}
          level={item.level}
          capacity={item.capacity}
          isAvailable={item.isAvailable}
        />
      )}
      ListHeaderComponent={<RoomListHeader {...headerProps} />}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator style={styles.loadingIndicator} />
        ) : (
          <EmptyState />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: sizes.xl,
    paddingHorizontal: sizes.md,
  },
  loadingIndicator: {
    padding: sizes.md,
  },
});
