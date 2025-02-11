import { Dimensions, ScaledSize } from "react-native";

let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export const scaleWidth = (size: number): number => {
  const scaleRatio = SCREEN_WIDTH / BASE_WIDTH;
  return size * scaleRatio;
};

export const scaleHeight = (size: number): number => {
  const scaleRatio = SCREEN_HEIGHT / BASE_HEIGHT;
  return size * scaleRatio;
};

export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scaleWidth(size) - size) * factor;
};

Dimensions.addEventListener("change", ({ window }: { window: ScaledSize }) => {
  SCREEN_WIDTH = window.width;
  SCREEN_HEIGHT = window.height;
});
