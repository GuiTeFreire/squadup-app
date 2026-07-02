import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  variant?: "compact" | "large";
  children?: React.ReactNode;
}

function Header({
  title,
  subtitle,
  onBack,
  rightElement,
  variant = "compact",
  children,
}: Readonly<HeaderProps>) {
  const insets = useSafeAreaInsets();
  const containerStyle = { paddingTop: insets.top + 12 };

  if (variant === "large") {
    let titleMargin = "";
    if (subtitle) titleMargin = "mb-1";
    else if (children) titleMargin = "mb-4";
    return (
      <View className="bg-secondary-900 px-5 pb-5" style={containerStyle}>
        <Text className={`text-white text-3xl font-bold tracking-tight ${titleMargin}`}>
          {title}
        </Text>
        {subtitle ? (
          <Text className={`text-secondary-400 text-sm ${children ? "mb-4" : ""}`}>{subtitle}</Text>
        ) : null}
        {children}
      </View>
    );
  }

  return (
    <View className="flex-row items-center bg-secondary-900 px-4 pb-4" style={containerStyle}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          className="w-10 h-10 items-center justify-center rounded-full bg-white/10 active:bg-white/20"
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.white} />
        </Pressable>
      ) : (
        <View className="w-10 h-10" />
      )}

      {subtitle ? (
        <View className="flex-1 mx-3">
          <Text className="text-white text-lg font-bold" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-secondary-400 text-xs" numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      ) : (
        <Text className="flex-1 text-white text-lg font-bold text-center mx-3" numberOfLines={1}>
          {title}
        </Text>
      )}

      {rightElement ?? <View className="w-10 h-10" />}
    </View>
  );
}

export default memo(Header);
