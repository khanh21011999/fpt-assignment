import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const colors = getColors();
  const colorStyles = getColorStyles(colors);

  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  const checkAndRequestPermissions = async () => {
    // Check camera permission
    const result = await requestPermission();
    // On iOS, can't determine if permission is permanently denied
    // On Android, status.granted will be false and canAskAgain will be false
    if (!result.granted && !result.canAskAgain) {
      setIsPermissionPermanentlyDenied(true);
    }
  };

  const checkPhotoPermission = async () => {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!granted) {
      const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!result.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library to select QR code images.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: openSettings },
          ]
        );
        return false;
      }
    }
    return true;
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
                : checkAndRequestPermissions
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

  const pickImage = async () => {
    try {
      const hasPermission = await checkPhotoPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        setIsProcessing(true);
        const scannedResults = await Camera.scanFromURLAsync(
          result.assets[0].uri,
          ["qr"]
        );
        setIsProcessing(false);

        if (scannedResults.length > 0) {
          const { data } = scannedResults[0];
          try {
            // Validate if the scanned data is a valid URL
            new URL(data);
            navigation.replace("BookingResult", {
              success: true,
              qrData: data,
            });
          } catch (error) {
            navigation.replace("BookingResult", {
              success: false,
              qrData: "Invalid QR Code URL",
            });
          }
        } else {
          Alert.alert(
            "No QR Code Found",
            "The selected image does not contain a valid QR code."
          );
        }
      }
    } catch (error) {
      setIsProcessing(false);
      Alert.alert("Error", "Failed to process the image. Please try again.");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorStyles.backgroundPrimary.backgroundColor },
      ]}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.galleryButton, { backgroundColor: colors.background }]}
          onPress={pickImage}
          disabled={isProcessing}
        >
          <View style={styles.galleryContent}>
            <Feather name="image" size={24} color={colors.textPrimary} />
            <Text style={[styles.galleryText, { color: colors.textPrimary }]}>
              Select from gallery
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <View style={styles.overlay}>
        <Text style={[styles.overlayText, { color: colors.textPrimary }]}>
          Scan QR Code
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: sizes.xl + sizes.lg,
    left: sizes.md,
    right: sizes.md,
    zIndex: 1,
    flexDirection: "row",
    gap: sizes.md,
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  backButton: {
    padding: sizes.xs,
    borderRadius: sizes.radiusFull,
  },
  galleryButton: {
    flex: 1,
    padding: sizes.sm,
    borderRadius: sizes.radiusFull,
  },
  galleryContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes.xs,
  },
  galleryText: {
    fontSize: sizes.fontMd,
    fontWeight: "600",
  },
  overlay: {
    position: "absolute",
    top: "20%",
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
