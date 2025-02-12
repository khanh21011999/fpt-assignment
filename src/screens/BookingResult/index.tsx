import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { getColors, getColorStyles, sizes } from "../../theme";
import { getStatusBarHeight } from "@utils/statusBar";
type Props = NativeStackScreenProps<RootStackParamList, "BookingResult">;

export default function BookingResultScreen({ route, navigation }: Props) {
  const { success, qrData } = route.params;
  const colors = getColors();
  const colorStyles = getColorStyles(colors);
  const statusBarHeight = getStatusBarHeight();
  return (
    <SafeAreaView style={[styles.container, colorStyles.backgroundPrimary]}>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? statusBarHeight : 0,
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RoomList")}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, colorStyles.textPrimary]}>
            Book a Room
          </Text>
        </View>

        <View style={styles.content}>
          <WebView
            source={{ uri: qrData }}
            style={styles.webview}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={[styles.loading, colorStyles.backgroundCard]}>
                <ActivityIndicator size="large" color={colors.textAccent} />
              </View>
            )}
          />
          <View style={styles.urlContainer}>
            <Text
              style={[styles.urlText, colorStyles.textPrimary]}
              numberOfLines={2}
            >
              {qrData}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: colors.textAccent }]}
          onPress={() => navigation.navigate("RoomList")}
        >
          <Text style={[styles.bottomButtonText, { color: colors.background }]}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizes.md,
    height: sizes.xl * 2.3,
    position: "relative",
  },
  backButton: {
    padding: sizes.xs,
    marginRight: sizes.xs,
    position: "absolute",
    left: sizes.xs,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: sizes.fontXl,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomButton: {
    margin: sizes.md,
    padding: sizes.md,
    borderRadius: sizes.radiusFull,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
  },
  bottomButtonText: {
    fontSize: sizes.fontMd,
    fontWeight: "600",
  },
  urlContainer: {
    padding: sizes.md,

    marginHorizontal: sizes.md,
    marginVertical: sizes.sm,
    borderRadius: sizes.radiusSm,
  },
  urlText: {
    fontSize: sizes.fontSm,
    textAlign: "center",
  },
});
