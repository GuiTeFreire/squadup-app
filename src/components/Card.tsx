import React, { memo } from "react";
import { Pressable, View, ViewProps } from "react-native";

import { shadows } from "../theme";

interface CardProps extends Omit<ViewProps, "className"> {
  children: React.ReactNode;
  onPress?: () => void;
  padded?: boolean;
  /** Eleva o card acima do plano da lista (ex.: destaque, modal) */
  raised?: boolean;
}

function Card({ children, onPress, padded = true, raised = false, ...rest }: Readonly<CardProps>) {
  const base = `bg-white rounded-2xl border border-neutral-100 ${padded ? "p-4" : ""}`;
  const shadow = raised ? shadows.raised : shadows.card;

  if (onPress) {
    return (
      <Pressable
        className={base}
        style={({ pressed }) => [
          shadow,
          pressed ? { transform: [{ scale: 0.985 }], opacity: 0.95 } : undefined,
        ]}
        onPress={onPress}
        accessibilityRole="button"
        {...rest}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={base} style={shadow} {...rest}>
      {children}
    </View>
  );
}

export default memo(Card);
