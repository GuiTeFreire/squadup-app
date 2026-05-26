import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Input from "../components/Input";
import { CURRENT_USER } from "../mocks/users";
import type { AppRootStackParamList } from "../navigation/types";
import type { ExperienceLevel, Sport } from "../types";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;

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

export default function EditProfileScreen() {
  const navigation = useNavigation<Nav>();
  const user = CURRENT_USER;

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? "");
  const [location, setLocation] = useState(user.location);
  const [selectedSports, setSelectedSports] = useState<Sport[]>(user.favoriteSports);
  const [level, setLevel] = useState<ExperienceLevel>(user.level);
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");

  const toggleSport = (sport: Sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const handleSave = () => {
    let valid = true;

    if (name.trim().length < 2) {
      setNameError("Nome deve ter ao menos 2 caracteres");
      valid = false;
    } else {
      setNameError("");
    }

    if (location.trim().length < 3) {
      setLocationError("Informe seu bairro ou cidade");
      valid = false;
    } else {
      setLocationError("");
    }

    if (!valid) return;

    Alert.alert("Perfil atualizado!", "Suas informações foram salvas com sucesso.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const handlePhotoPress = () => {
    Alert.alert("Foto de perfil", "Upload de fotos disponível em breve!");
  };

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="bg-secondary-900 pt-14 pb-4 px-4 flex-row items-center">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-9 h-9 items-center justify-center"
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </Pressable>
        <Text className="flex-1 text-white text-lg font-bold text-center mx-2">Editar perfil</Text>
        <View className="w-9" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Photo */}
        <View className="items-center mb-6">
          <Pressable onPress={handlePhotoPress} accessibilityLabel="Alterar foto de perfil">
            <Avatar name={name || user.name} photoUrl={user.photoUrl} size="xl" />
            <View className="mt-2">
              <Text className="text-sm text-primary-500 text-center font-medium">Alterar foto</Text>
            </View>
          </Pressable>
        </View>

        <View className="gap-4">
          {/* Name */}
          <Input
            label="Nome"
            value={name}
            onChangeText={setName}
            error={nameError}
            placeholder="Seu nome"
            autoCapitalize="words"
          />

          {/* Bio */}
          <Input
            label="Bio (opcional)"
            value={bio}
            onChangeText={setBio}
            placeholder="Conte um pouco sobre você e seu estilo de jogo"
            autoCapitalize="sentences"
          />

          {/* Location */}
          <Input
            label="Localização aproximada"
            value={location}
            onChangeText={setLocation}
            error={locationError}
            placeholder="Ex: Pinheiros, São Paulo"
            autoCapitalize="words"
          />

          {/* Sports */}
          <View>
            <Text className="text-sm font-semibold text-secondary-900 mb-3">
              Esportes favoritos
            </Text>
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

          {/* Level */}
          <View>
            <Text className="text-sm font-semibold text-secondary-900 mb-3">
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

          <Button label="Salvar alterações" onPress={handleSave} variant="primary" fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
