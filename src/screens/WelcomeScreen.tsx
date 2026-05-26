import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, Text, View } from "react-native";

import logoSource from "../../assets/squadup_logo.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../components/Button";
import type { AuthStackParamList } from "../navigation/types";

type WelcomeNavProp = NativeStackNavigationProp<AuthStackParamList, "Welcome">;

type SportIcon = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const SPORTS: { icon: SportIcon; label: string }[] = [
  { icon: "soccer", label: "Futebol" },
  { icon: "basketball", label: "Basquete" },
  { icon: "volleyball", label: "Vôlei" },
  { icon: "tennis", label: "Tênis" },
];

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavProp>();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-secondary-900">
      {/* Hero section */}
      <View
        className="flex-1 items-center justify-center px-8"
        style={{ paddingTop: insets.top + 24 }}
      >
        {/* Logo em container branco sobre fundo escuro */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 24,
            paddingVertical: 14,
            marginBottom: 28,
          }}
        >
          <Image
            source={logoSource}
            style={{ width: 180, height: 54 }}
            resizeMode="contain"
            accessibilityLabel="SquadUp"
          />
        </View>

        <Text className="text-lg font-semibold text-primary-400 mb-4">
          Conecte-se. Jogue. Repita.
        </Text>

        <Text className="text-sm text-secondary-400 text-center leading-relaxed">
          Encontre partidas, forme grupos e pratique{"\n"}o esporte que você ama.
        </Text>

        {/* Sport chips */}
        <View className="flex-row mt-10 gap-3">
          {SPORTS.map((sport) => (
            <View key={sport.label} className="items-center gap-2">
              <View className="w-14 h-14 rounded-xl bg-secondary-800 items-center justify-center border border-secondary-700">
                <MaterialCommunityIcons name={sport.icon} size={26} color="#2563EB" />
              </View>
              <Text className="text-xs text-secondary-400 font-medium">{sport.label}</Text>
            </View>
          ))}
        </View>

        {/* Stats row */}
        <View className="flex-row mt-8 gap-6">
          <View className="items-center">
            <Text className="text-2xl font-bold text-white">10k+</Text>
            <Text className="text-xs text-secondary-400 mt-0.5">Jogadores</Text>
          </View>
          <View className="w-px bg-secondary-700" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-white">500+</Text>
            <Text className="text-xs text-secondary-400 mt-0.5">Partidas/mês</Text>
          </View>
          <View className="w-px bg-secondary-700" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-white">6</Text>
            <Text className="text-xs text-secondary-400 mt-0.5">Esportes</Text>
          </View>
        </View>
      </View>

      {/* CTA section */}
      <View
        className="px-6 pt-6 border-t border-secondary-800"
        style={{ paddingBottom: Math.max(insets.bottom, 32) }}
      >
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
          variant="outline"
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
}
