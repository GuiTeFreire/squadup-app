import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";

import type { AppRootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;

export default function ReportUserScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View className="flex-1 bg-neutral-50">
      <View className="bg-secondary-900 pt-14 pb-4 px-4 flex-row items-center">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-9 h-9 items-center justify-center"
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </Pressable>
        <Text className="flex-1 text-white text-lg font-bold text-center mx-2">Denunciar</Text>
        <View className="w-9" />
      </View>
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-5xl mb-4">🚩</Text>
        <Text className="text-xl font-bold text-secondary-900 mb-2 text-center">
          Formulário de denúncia
        </Text>
        <Text className="text-sm text-neutral-500 text-center">
          Disponível na Fase 10 do desenvolvimento.
        </Text>
      </View>
    </View>
  );
}
