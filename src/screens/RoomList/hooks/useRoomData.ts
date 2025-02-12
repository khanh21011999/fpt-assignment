import { useState, useEffect } from "react";
import { Room, ApiRoom } from "../types";
import { fetchRoomAvailability } from "@api/client";

interface UseRoomDataResult {
  rooms: Room[];
  isLoading: boolean;
  error: string | null;
  handleSortRooms: (sortOption?: string) => void;
}

export const useRoomData = (selectedDateTime: Date): UseRoomDataResult => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transformApiData = (apiRooms: ApiRoom[]): Room[] => {
    const timeKey = selectedDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return apiRooms.map((room) => ({
      ...room,
      id: room.name.toLowerCase().replace(/\s+/g, "-"),
      isAvailable: room.availability[timeKey] === "1",
    }));
  };

  const handleSortRooms = (sortOption?: string) => {
    setRooms((prevRooms) => {
      const sortingOption = sortOption?.toLowerCase() || "level";

      return [...prevRooms].sort((a, b) => {
        switch (sortingOption) {
          case "level":
            return parseInt(a.level) - parseInt(b.level);
          case "capacity":
            return parseInt(b.capacity) - parseInt(a.capacity);
          case "availability":
            return a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1;
          default:
            return 0;
        }
      });
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchRooms = async () => {
      try {
        const response = await fetchRoomAvailability();
        const transformedRooms = transformApiData(response);
        setRooms(transformedRooms);
        handleSortRooms(); // Apply default sorting by level
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch rooms");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [selectedDateTime]);

  return {
    rooms,
    isLoading,
    error,
    handleSortRooms,
  };
};
