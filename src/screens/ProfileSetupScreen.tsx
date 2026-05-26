import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import type { ExperienceLevel, Sport } from "../types";

const SPORTS: Sport[] = ["football", "volleyball", "basketball", "tennis", "futsal", "other"];

const SPORT_LABELS: Record<Sport, string> = {
  football: "⚽ Futebol",
  volleyball: "🏐 Vôlei",
  basketball: "🏀 Basquete",
  tennis: "🎾 Tênis",
  futsal: "🥅 Futsal",
  other: "🏃 Outro",
};

const LEVELS: ExperienceLevel[] = ["beginner", "intermediate", "advanced"];

const LEVEL_LABELS: Record<ExperienceLevel, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

export default function ProfileSetupScreen() {
  const { completeProfile, pendingName } = useAuth();

  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [level, setLevel] = useState<ExperienceLevel | null>(null);
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");

  const toggleSport = (sport: Sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const handleComplete = () => {
    if (location.trim().length < 3) {
      setLocationError("Informe seu bairro ou cidade");
      return;
    }
    setLocationError("");

    completeProfile({
      favoriteSports: selectedSports,
      level: level ?? "beginner",
      location: location.trim(),
    });
  };

  const handlePhotoPress = () => {
    Alert.alert("Foto de perfil", "Upload de fotos disponível em breve!");
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1, padding: 24 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="mb-6">
        <Text className="text-3xl font-bold text-secondary-900">Configure seu perfil</Text>
        <Text className="mt-2 text-base text-neutral-500">
          Conte-nos um pouco sobre você para encontrar partidas ideais
        </Text>
      </View>

      <View className="items-center mb-8">
        <Pressable onPress={handlePhotoPress} accessibilityLabel="Alterar foto de perfil">
          <Avatar name={pendingName || "Eu"} size="xl" />
          <View className="mt-2">
            <Text className="text-sm text-primary-500 text-center font-medium">Adicionar foto</Text>
          </View>
        </Pressable>
      </View>

      <View className="mb-6">
        <Text className="text-base font-semibold text-secondary-800 mb-3">Esportes favoritos</Text>
        <View className="flex-row flex-wrap">
          {SPORTS.map((sport) => {
            const selected = selectedSports.includes(sport);
            return (
              <Pressable
                key={sport}
                onPress={() => toggleSport(sport)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected }}
                accessibilityLabel={SPORT_LABELS[sport]}
                className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                  selected ? "bg-primary-500 border-primary-500" : "bg-white border-neutral-300"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${selected ? "text-white" : "text-neutral-700"}`}
                >
                  {SPORT_LABELS[sport]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-base font-semibold text-secondary-800 mb-3">
          Nível de experiência
        </Text>
        <View className="flex-row">
          {LEVELS.map((lvl) => {
            const selected = level === lvl;
            return (
              <Pressable
                key={lvl}
                onPress={() => setLevel(lvl)}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                accessibilityLabel={LEVEL_LABELS[lvl]}
                className={`flex-1 mx-1 py-3 rounded-lg border items-center ${
                  selected ? "bg-primary-500 border-primary-500" : "bg-white border-neutral-300"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${selected ? "text-white" : "text-neutral-700"}`}
                >
                  {LEVEL_LABELS[lvl]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="mb-8">
        <Input
          label="Localização aproximada"
          value={location}
          onChangeText={setLocation}
          error={locationError}
          placeholder="Ex: Pinheiros, São Paulo"
          autoCapitalize="words"
        />
      </View>

      <Button
        label="Concluir configuração"
        onPress={handleComplete}
        variant="primary"
        size="lg"
        fullWidth
      />

      <View className="mt-4">
        <Button
          label="Pular por agora"
          onPress={() =>
            completeProfile({ favoriteSports: [], level: "beginner", location: "São Paulo" })
          }
          variant="ghost"
          size="md"
          fullWidth
        />
      </View>
    </ScrollView>
  );
}
