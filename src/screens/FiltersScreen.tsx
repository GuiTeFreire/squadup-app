import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import Button from "../components/Button";
import Chip from "../components/Chip";
import type { MatchFilters } from "../contexts/MatchFiltersContext";
import { useMatchFiltersContext } from "../contexts/MatchFiltersContext";
import { colors, LEVEL_META, shadows, SPORT_META } from "../theme";
import type { ExperienceLevel, Sport } from "../types";

const SPORTS: Sport[] = ["football", "futsal", "volleyball", "basketball", "tennis"];
const LEVELS: ExperienceLevel[] = ["beginner", "intermediate", "advanced"];

function SectionLabel({ children }: Readonly<{ children: string }>) {
  return <Text className="text-sm font-bold text-secondary-900 mb-3">{children}</Text>;
}

export default function FiltersScreen() {
  const navigation = useNavigation();
  const { filters, setFilters, clearFilters } = useMatchFiltersContext();

  const [local, setLocal] = useState<MatchFilters>({ ...filters });

  function toggleSport(sport: Sport) {
    setLocal((prev) => ({ ...prev, sport: prev.sport === sport ? null : sport }));
  }

  function toggleLevel(level: ExperienceLevel) {
    setLocal((prev) => ({ ...prev, level: prev.level === level ? null : level }));
  }

  function handleApply() {
    setFilters(local);
    navigation.goBack();
  }

  function handleClear() {
    clearFilters();
    setLocal({ sport: null, level: null, onlyAvailable: false });
  }

  const localActiveCount = [local.sport, local.level, local.onlyAvailable || null].filter(
    Boolean
  ).length;

  let applyLabel = "Aplicar filtros";
  if (localActiveCount === 1) applyLabel = "Aplicar 1 filtro";
  else if (localActiveCount > 1) applyLabel = `Aplicar ${localActiveCount} filtros`;

  return (
    <View className="flex-1 bg-white">
      {/* Handle bar */}
      <View className="items-center pt-3 pb-1">
        <View className="w-10 h-1 bg-neutral-200 rounded-full" />
      </View>

      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3">
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Fechar filtros"
          className="w-9 h-9 items-center justify-center rounded-full bg-secondary-100 active:bg-secondary-200"
        >
          <MaterialCommunityIcons name="close" size={20} color={colors.secondary[700]} />
        </Pressable>
        <Text className="text-base font-bold text-secondary-900">Filtros</Text>
        <Pressable
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Limpar filtros"
          className="h-9 justify-center"
        >
          <Text className="text-sm text-primary-500 font-semibold">Limpar</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {/* Sport */}
        <SectionLabel>Esporte</SectionLabel>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {SPORTS.map((sport) => (
            <Chip
              key={sport}
              label={SPORT_META[sport].label}
              icon={SPORT_META[sport].icon}
              iconColor={SPORT_META[sport].color}
              selected={local.sport === sport}
              onPress={() => toggleSport(sport)}
            />
          ))}
        </View>

        {/* Level */}
        <SectionLabel>Nível</SectionLabel>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {LEVELS.map((level) => (
            <Chip
              key={level}
              label={LEVEL_META[level].label}
              selected={local.level === level}
              onPress={() => toggleLevel(level)}
            />
          ))}
        </View>

        {/* Only available */}
        <SectionLabel>Disponibilidade</SectionLabel>
        <Pressable
          className={`flex-row items-center justify-between p-4 rounded-2xl border mb-6 ${
            local.onlyAvailable ? "bg-primary-50 border-primary-300" : "bg-white border-neutral-200"
          }`}
          onPress={() => setLocal((prev) => ({ ...prev, onlyAvailable: !prev.onlyAvailable }))}
          accessibilityRole="switch"
          accessibilityState={{ checked: local.onlyAvailable }}
        >
          <View className="flex-row items-center gap-3 flex-1">
            <MaterialCommunityIcons
              name="account-check-outline"
              size={20}
              color={local.onlyAvailable ? colors.primary[500] : colors.secondary[500]}
            />
            <Text
              className={`text-sm font-semibold ${
                local.onlyAvailable ? "text-primary-700" : "text-neutral-600"
              }`}
            >
              Somente com vagas disponíveis
            </Text>
          </View>
          <View
            className={`w-6 h-6 rounded-lg border-2 items-center justify-center ${
              local.onlyAvailable ? "bg-primary-500 border-primary-500" : "border-neutral-300"
            }`}
          >
            {local.onlyAvailable && (
              <MaterialCommunityIcons name="check-bold" size={14} color={colors.white} />
            )}
          </View>
        </Pressable>
      </ScrollView>

      {/* Apply button */}
      <View className="px-5 pb-8 pt-4 bg-white" style={shadows.floating}>
        <Button label={applyLabel} onPress={handleApply} size="lg" fullWidth />
      </View>
    </View>
  );
}
