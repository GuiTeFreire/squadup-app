import React from "react";
import { Text, View } from "react-native";

import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      <Text className="text-5xl mb-4">⚽</Text>
      <Text className="text-2xl font-bold text-neutral-900 mb-2">
        Olá, {user?.name?.split(" ")[0]}!
      </Text>
      <Text className="text-base text-neutral-500 text-center mb-8">
        A listagem de partidas estará disponível em breve.
      </Text>
      <Text
        className="text-sm text-primary-500 font-semibold"
        onPress={logout}
        accessibilityRole="button"
        accessibilityLabel="Sair"
      >
        Sair da conta
      </Text>
    </View>
  );
}
