import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

function Header({ title, onBack, rightElement }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-neutral-100">
      <View className="w-10">
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            className="p-1"
          >
            <Text className="text-2xl text-neutral-700">‹</Text>
          </Pressable>
        ) : null}
      </View>

      <Text className="flex-1 text-center text-lg font-semibold text-neutral-900" numberOfLines={1}>
        {title}
      </Text>

      <View className="w-10 items-end">{rightElement ?? null}</View>
    </View>
  );
}

export default memo(Header);
