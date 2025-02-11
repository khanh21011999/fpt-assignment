import { moderateScale } from "../utils/responsive";

export const sizes = {
  // Spacing
  xxs: moderateScale(4),
  xs: moderateScale(8),
  sm: moderateScale(12),
  md: moderateScale(16),
  lg: moderateScale(20),
  xl: moderateScale(24),
  xxl: moderateScale(32),

  // Font sizes
  fontXs: moderateScale(12),
  fontSm: moderateScale(14),
  fontMd: moderateScale(16),
  fontLg: moderateScale(18),
  fontXl: moderateScale(24),

  // Border radius
  radiusSm: moderateScale(4),
  radiusMd: moderateScale(8),
  radiusLg: moderateScale(16),
  radiusFull: moderateScale(999),
} as const;
