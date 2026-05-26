import React from "react";
import { Text, View } from "react-native";

export default function CreateMatchScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-50 px-8">
      <Text className="text-5xl mb-4">➕</Text>
      <Text className="text-xl font-bold text-secondary-900 mb-2">Criar Partida</Text>
      <Text className="text-sm text-neutral-500 text-center">
        Disponível na Fase 6 do desenvolvimento.
      </Text>
    </View>
  );
}
