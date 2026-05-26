import React from "react";
import { Text, View } from "react-native";

import { useAuth } from "../contexts/AuthContext";

export default function MyProfileScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-neutral-50 px-8">
      <Text className="text-5xl mb-4">👤</Text>
      <Text className="text-xl font-bold text-secondary-900 mb-2">
        {user?.name ?? "Meu Perfil"}
      </Text>
      <Text className="text-sm text-neutral-500 text-center">
        Tela de perfil disponível na Fase 3 do desenvolvimento.
      </Text>
    </View>
  );
}
