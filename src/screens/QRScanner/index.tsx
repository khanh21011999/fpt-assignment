import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { getColors, getColorStyles, sizes } from "../../theme";
import Feather from "@expo/vector-icons/Feather";

type Props = NativeStackScreenProps<RootStackParamList, "QRScanner">;

export default function QRScannerScreen({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isPermissionPermanentlyDenied, setIsPermissionPermanentlyDenied] =
    useState(false);
  const [scanned, setScanned] = useState(false);
  const colors = getColors();
  const colorStyles = getColorStyles(colors);

  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  const checkAndRequestPermission = async () => {
    const result = await requestPermission();
    // On iOS, can't determine if permission is permanently denied
    // On Android, status.granted will be false and canAskAgain will be false
    if (!result.granted && !result.canAskAgain) {
      setIsPermissionPermanentlyDenied(true);
    }
  };

  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const handleBarCodeScanned = async ({
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return;

    try {
      setScanned(true);
      // Validate if the scanned data is a valid URL
      new URL(data);

      // Navigate to BookingResult with the scanned URL
      navigation.replace("BookingResult", {
        success: true,
        qrData: data,
      });
    } catch (error) {
      // If URL is invalid, show error state
      navigation.replace("BookingResult", {
        success: false,
        qrData: "Invalid QR Code URL",
      });
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={[styles.container, colorStyles.backgroundPrimary]}>
        <View style={styles.noPermissionContainer}>
          <Feather name="camera-off" size={48} color={colors.textPrimary} />
          <Text style={[styles.noPermissionText, colorStyles.textPrimary]}>
            Just a moment...{"\n"}Setting up your camera
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, colorStyles.backgroundPrimary]}>
        <View style={styles.noPermissionContainer}>
          <Feather name="camera-off" size={48} color={colors.textPrimary} />
          <Text style={[styles.noPermissionText, colorStyles.textPrimary]}>
            {isPermissionPermanentlyDenied
              ? "Please enable camera access in Settings"
              : "We need your camera to scan QR codes"}
          </Text>
          <TouchableOpacity
            style={[
              styles.enableButton,
              { backgroundColor: colors.textAccent },
            ]}
            onPress={
              isPermissionPermanentlyDenied
                ? openSettings
                : checkAndRequestPermission
            }
          >
            <Text
              style={[styles.enableButtonText, { color: colors.background }]}
            >
              {isPermissionPermanentlyDenied
                ? "Open Settings"
                : "Allow Camera Access"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={colors.background} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#000" }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color={colors.background} />
      </TouchableOpacity>

      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <View style={styles.overlay}>
        <Text style={[styles.overlayText, { color: colors.background }]}>
          Scan QR Code
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    bottom: sizes.xl + sizes.lg,
    left: sizes.md,
    zIndex: 1,
    padding: sizes.xs,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: sizes.radiusFull,
  },
  overlay: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  overlayText: {
    fontSize: sizes.fontXl,
    fontWeight: "600",
  },
  noPermissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: sizes.md,
  },
  noPermissionText: {
    fontSize: sizes.fontMd,
    fontWeight: "500",
    textAlign: "center",
    marginTop: sizes.xs,
  },
  enableButton: {
    paddingVertical: sizes.xs,
    paddingHorizontal: sizes.lg,
    borderRadius: sizes.radiusMd,
    marginTop: sizes.xs,
  },
  enableButtonText: {
    fontSize: sizes.fontMd,
    fontWeight: "600",
  },
});
