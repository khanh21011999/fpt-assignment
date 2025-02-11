import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

export interface RoomAvailability {
  [key: string]: "0" | "1"; // Time slot (e.g., "08:00") to availability mapping
}

export interface ApiRoom {
  name: string;
  capacity: string;
  level: string;
  availability: RoomAvailability;
}

export interface Room extends ApiRoom {
  id: string;
  isAvailable: boolean;
}

export type RoomListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "RoomList"
>;

export interface DateTimeSelectorProps {
  selectedDateTime: Date;
  onDateTimeChange: (date: Date) => void;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
}

export interface RoomListHeaderProps {
  onSortPress: () => void;
}

export interface HeaderProps {
  onCameraPress: () => void;
}
