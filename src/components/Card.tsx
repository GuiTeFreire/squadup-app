import React, { memo } from "react";
import { Pressable, View, ViewProps } from "react-native";

interface CardProps extends Omit<ViewProps, "className"> {
  children: React.ReactNode;
  onPress?: () => void;
  padded?: boolean;
}

function Card({ children, onPress, padded = true, ...rest }: CardProps) {
  const base = `bg-white rounded-2xl shadow-sm border border-neutral-100 ${padded ? "p-4" : ""}`;

  if (onPress) {
    return (
      <Pressable
        className={`${base} active:opacity-80`}
        onPress={onPress}
        accessibilityRole="button"
        {...(rest as object)}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={base} {...rest}>
      {children}
    </View>
  );
}

export default memo(Card);
