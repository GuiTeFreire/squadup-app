import React, { memo } from "react";
import { Text, View } from "react-native";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({ icon = "🔍", title, description, action }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <Text className="text-5xl mb-4">{icon}</Text>
      <Text className="text-lg font-semibold text-neutral-800 text-center mb-2">{title}</Text>
      {description ? (
        <Text className="text-base text-neutral-500 text-center mb-6">{description}</Text>
      ) : null}
      {action ?? null}
    </View>
  );
}

export default memo(EmptyState);
