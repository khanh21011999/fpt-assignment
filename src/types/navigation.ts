import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  RoomList: undefined;
  QRScanner: undefined;
  BookingResult: {
    success: boolean;
    qrData: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
