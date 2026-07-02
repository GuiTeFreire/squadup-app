import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const starFontSize: Record<"sm" | "md" | "lg", number> = {
  sm: 20,
  md: 28,
  lg: 36,
};

function StarRatingInput({ value, onChange, label, size = "md" }: StarRatingInputProps) {
  return (
    <View className="gap-1">
      {label ? <Text className="text-sm text-secondary-800 font-medium">{label}</Text> : null}
      <View className="flex-row gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            onPress={() => onChange(star)}
            accessibilityLabel={`${star} estrela${star !== 1 ? "s" : ""}`}
            accessibilityRole="button"
            hitSlop={4}
          >
            <Text
              style={{ fontSize: starFontSize[size] }}
              className={star <= value ? "text-warning" : "text-neutral-300"}
            >
              ★
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default memo(StarRatingInput);
