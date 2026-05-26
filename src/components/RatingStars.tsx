import React, { memo } from "react";
import { Text, View } from "react-native";

interface RatingStarsProps {
  rating: number;
  max?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
}

const starSize: Record<"sm" | "md" | "lg", string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

const labelSize: Record<"sm" | "md" | "lg", string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

function RatingStars({ rating, max = 5, showValue = true, size = "md" }: RatingStarsProps) {
  const clamped = Math.min(Math.max(rating, 0), max);
  const fullStars = Math.floor(clamped);
  const hasHalf = clamped - fullStars >= 0.5;
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0);

  return (
    <View className="flex-row items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Text key={`full-${i}`} className={`${starSize[size]} text-amber-400`}>
          ★
        </Text>
      ))}
      {hasHalf ? (
        <Text key="half" className={`${starSize[size]} text-amber-300`}>
          ★
        </Text>
      ) : null}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Text key={`empty-${i}`} className={`${starSize[size]} text-neutral-300`}>
          ★
        </Text>
      ))}
      {showValue ? (
        <Text className={`ml-1 ${labelSize[size]} text-neutral-500`}>{clamped.toFixed(1)}</Text>
      ) : null}
    </View>
  );
}

export default memo(RatingStars);
