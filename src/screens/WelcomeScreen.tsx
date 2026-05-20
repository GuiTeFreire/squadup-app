import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../components/Button";
import type { AuthStackParamList } from "../navigation/types";

type WelcomeNavProp = NativeStackNavigationProp<AuthStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavProp>();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <View
        className="flex-1 items-center justify-center bg-primary-500 px-8"
        style={{ paddingTop: insets.top }}
      >
        <Text className="text-6xl mb-4">⚽🏐🏀</Text>
        <Text className="text-4xl font-bold text-white mb-2">SquadUp</Text>
        <Text className="text-lg text-primary-100 text-center">Conecte-se. Jogue. Repita.</Text>
        <Text className="mt-4 text-sm text-primary-200 text-center">
          Encontre partidas, forme grupos e pratique o esporte que você ama.
        </Text>
      </View>

      <View className="bg-white px-8 pt-8" style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
        <Button
          label="Entrar"
          onPress={() => navigation.navigate("Login")}
          variant="primary"
          size="lg"
          fullWidth
        />
        <View className="h-3" />
        <Button
          label="Criar conta"
          onPress={() => navigation.navigate("Register")}
          variant="ghost"
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
}
