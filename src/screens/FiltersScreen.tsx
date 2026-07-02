import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import Button from "../components/Button";
import type { MatchFilters } from "../contexts/MatchFiltersContext";
import { useMatchFiltersContext } from "../contexts/MatchFiltersContext";
import type { ExperienceLevel, Sport } from "../types";

const SPORTS: { value: Sport; label: string; emoji: string }[] = [
  { value: "football", label: "Futebol", emoji: "⚽" },
  { value: "futsal", label: "Futsal", emoji: "🥅" },
  { value: "volleyball", label: "Vôlei", emoji: "🏐" },
  { value: "basketball", label: "Basquete", emoji: "🏀" },
  { value: "tennis", label: "Tênis", emoji: "🎾" },
];

const LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
];

function ChipButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-2 rounded-full border mr-2 mb-2 ${
        selected ? "bg-primary-500 border-primary-500" : "bg-white border-neutral-200"
      }`}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <Text className={`text-sm font-medium ${selected ? "text-white" : "text-neutral-700"}`}>
        {label}
      </Text>
    </Pressable>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <Text className="text-sm font-semibold text-secondary-900 mb-3">{children}</Text>;
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

  return (
    <View className="flex-1 bg-white">
      {/* Handle bar */}
      <View className="items-center pt-3 pb-1">
        <View className="w-10 h-1 bg-neutral-300 rounded-full" />
      </View>

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-100">
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Fechar filtros"
        >
          <MaterialCommunityIcons name="close" size={22} color="#334155" />
        </Pressable>
        <Text className="text-base font-bold text-secondary-900">Filtros</Text>
        <Pressable
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Limpar filtros"
        >
          <Text className="text-sm text-primary-500 font-medium">Limpar</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4 pt-5" showsVerticalScrollIndicator={false}>
        {/* Sport */}
        <SectionLabel>Esporte</SectionLabel>
        <View className="flex-row flex-wrap mb-4">
          {SPORTS.map((s) => (
            <ChipButton
              key={s.value}
              label={`${s.emoji} ${s.label}`}
              selected={local.sport === s.value}
              onPress={() => toggleSport(s.value)}
            />
          ))}
        </View>

        {/* Level */}
        <SectionLabel>Nível</SectionLabel>
        <View className="flex-row flex-wrap mb-4">
          {LEVELS.map((l) => (
            <ChipButton
              key={l.value}
              label={l.label}
              selected={local.level === l.value}
              onPress={() => toggleLevel(l.value)}
            />
          ))}
        </View>

        {/* Only available */}
        <SectionLabel>Disponibilidade</SectionLabel>
        <Pressable
          className={`flex-row items-center justify-between p-4 rounded-xl border mb-6 ${
            local.onlyAvailable ? "bg-primary-50 border-primary-300" : "bg-white border-neutral-200"
          }`}
          onPress={() => setLocal((prev) => ({ ...prev, onlyAvailable: !prev.onlyAvailable }))}
          accessibilityRole="switch"
          accessibilityState={{ checked: local.onlyAvailable }}
        >
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons
              name="account-check-outline"
              size={20}
              color={local.onlyAvailable ? "#2563EB" : "#64748B"}
            />
            <Text
              className={`text-sm font-medium ${local.onlyAvailable ? "text-primary-700" : "text-neutral-700"}`}
            >
              Somente com vagas disponíveis
            </Text>
          </View>
          <View
            className={`w-5 h-5 rounded border-2 items-center justify-center ${
              local.onlyAvailable ? "bg-primary-500 border-primary-500" : "border-neutral-300"
            }`}
          >
            {local.onlyAvailable && <MaterialCommunityIcons name="check" size={13} color="white" />}
          </View>
        </Pressable>
      </ScrollView>

      {/* Apply button */}
      <View className="px-4 pb-8 pt-4 border-t border-neutral-100">
        <Button
          label={
            localActiveCount > 0
              ? `Aplicar ${localActiveCount} filtro${localActiveCount !== 1 ? "s" : ""}`
              : "Aplicar filtros"
          }
          onPress={handleApply}
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
}
