import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

function Header({ title, onBack, rightElement }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between bg-secondary-900 px-4 py-3 border-b border-secondary-800">
      <View className="w-10">
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            className="p-1"
          >
            <Text className="text-2xl text-white">‹</Text>
          </Pressable>
        ) : null}
      </View>

      <Text className="flex-1 text-center text-lg font-semibold text-white" numberOfLines={1}>
        {title}
      </Text>

      <View className="w-10 items-end">{rightElement ?? null}</View>
    </View>
  );
}

export default memo(Header);
