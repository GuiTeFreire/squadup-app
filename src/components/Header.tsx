import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const containerStyle = { paddingTop: insets.top + 12 };

  if (variant === "large") {
    return (
      <View className="bg-secondary-900 px-4 pb-4" style={containerStyle}>
        <Text className={`text-white text-2xl font-bold ${children ? "mb-4" : ""}`}>{title}</Text>
        {children}
      </View>
    );
  }

  return (
    <View className="flex-row items-center bg-secondary-900 px-4 pb-4" style={containerStyle}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          className="w-9 h-9 items-center justify-center"
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </Pressable>
      ) : (
        <View className="w-9 h-9" />
      )}

      {subtitle ? (
        <View className="flex-1 mx-2">
          <Text className="text-white text-lg font-bold" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-secondary-400 text-xs" numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      ) : (
        <Text className="flex-1 text-white text-lg font-bold text-center mx-2" numberOfLines={1}>
          {title}
        </Text>
      )}

      {rightElement ?? <View className="w-9 h-9" />}
    </View>
  );
}

export default memo(Header);
