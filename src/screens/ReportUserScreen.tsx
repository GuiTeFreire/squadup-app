import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { useMatchesContext } from "../contexts/MatchesContext";
import { useReportsContext } from "../contexts/ReportsContext";
import { CURRENT_USER, MOCK_USERS } from "../mocks/users";
import type { AppRootStackParamList } from "../navigation/types";
import type { ReportReason } from "../types";
import { formatMatchDate } from "../utils/date";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;
type Route = RouteProp<AppRootStackParamList, "ReportUser">;

const REPORT_REASONS: ReadonlyArray<{ value: ReportReason; label: string }> = [
  { value: "bad_behavior", label: "Comportamento inadequado" },
  { value: "violence", label: "Violência ou agressão" },
  { value: "no_show", label: "Não compareceu" },
  { value: "hate_speech", label: "Discurso de ódio" },
  { value: "spam", label: "Spam ou publicidade" },
  { value: "fake_info", label: "Informações falsas" },
  { value: "other", label: "Outro" },
];

export default function ReportUserScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { userId } = route.params;
  const { matches } = useMatchesContext();
  const { addReport } = useReportsContext();

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = useMemo(() => MOCK_USERS.find((u) => u.id === userId) ?? null, [userId]);
  const userMatches = useMemo(
    () => matches.filter((m) => m.participants.some((p) => p.user.id === userId)),
    [matches, userId]
  );

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50">
        <Text className="text-neutral-500">Usuário não encontrado.</Text>
      </View>
    );
  }

  function selectReason(value: string) {
    setSelectedReason(value);
    if (error) setError(null);
  }

  function handleSubmit() {
    if (!selectedReason) {
      setError("Selecione o motivo da denúncia.");
      return;
    }
    const relatedMatch = userMatches.find((m) => m.id === selectedMatchId);
    addReport({
      id: `report-${Date.now()}`,
      reportedUser: user!,
      reporterUser: CURRENT_USER,
      match: relatedMatch,
      reason: selectedReason as ReportReason,
      description,
      createdAt: new Date().toISOString(),
      status: "pending",
    });
    Alert.alert(
      "Denúncia enviada!",
      `Sua denúncia sobre ${user!.name} foi registrada. Vamos analisar o caso em até 48 horas.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  }

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
        <Text className="flex-1 text-white text-lg font-bold text-center mx-2">
          Denunciar usuário
        </Text>
        <View className="w-9" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      >
        {/* User card */}
        <View className="bg-white rounded-2xl p-4 flex-row items-center gap-3 mb-4">
          <Avatar name={user.name} photoUrl={user.photoUrl} size="md" />
          <View className="flex-1">
            <Text className="text-base font-bold text-secondary-900" numberOfLines={1}>
              {user.name}
            </Text>
            <Text className="text-xs text-neutral-500 mt-0.5">Usuário sendo denunciado</Text>
          </View>
          <MaterialCommunityIcons name="flag" size={20} color="#EF4444" />
        </View>

        {/* Reason */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-sm font-semibold text-secondary-900 mb-1">
            Motivo da denúncia <Text className="text-error font-normal">*</Text>
          </Text>
          <Text className="text-xs text-neutral-400 mb-3">Selecione o motivo principal</Text>
          <View className="flex-row flex-wrap gap-2">
            {REPORT_REASONS.map(({ value, label }) => {
              const selected = selectedReason === value;
              return (
                <Pressable
                  key={value}
                  onPress={() => selectReason(value)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={label}
                  className={`px-3 py-2 rounded-xl border ${
                    selected ? "bg-error/10 border-error" : "bg-neutral-50 border-neutral-200"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selected ? "text-error" : "text-neutral-600"
                    }`}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Related match (optional) */}
        {userMatches.length > 0 && (
          <View className="bg-white rounded-2xl p-4 mb-4">
            <Text className="text-sm font-semibold text-secondary-900 mb-1">
              Partida relacionada
            </Text>
            <Text className="text-xs text-neutral-400 mb-3">Opcional</Text>
            <View className="flex-row flex-wrap gap-2">
              <Pressable
                onPress={() => setSelectedMatchId(null)}
                accessibilityRole="radio"
                accessibilityState={{ selected: selectedMatchId === null }}
                accessibilityLabel="Nenhuma partida"
                className={`px-3 py-2 rounded-xl border ${
                  selectedMatchId === null
                    ? "bg-primary-50 border-primary-300"
                    : "bg-neutral-50 border-neutral-200"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedMatchId === null ? "text-primary-700" : "text-neutral-600"
                  }`}
                >
                  Nenhuma
                </Text>
              </Pressable>

              {userMatches.map((m) => {
                const selected = selectedMatchId === m.id;
                return (
                  <Pressable
                    key={m.id}
                    onPress={() => setSelectedMatchId(m.id)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    accessibilityLabel={m.title}
                    className={`px-3 py-2 rounded-xl border ${
                      selected
                        ? "bg-primary-50 border-primary-300"
                        : "bg-neutral-50 border-neutral-200"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        selected ? "text-primary-700" : "text-neutral-600"
                      }`}
                      numberOfLines={1}
                    >
                      {m.title}
                    </Text>
                    <Text className="text-xs text-neutral-400 mt-0.5">
                      {formatMatchDate(m.date)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* Description */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-sm font-semibold text-secondary-900 mb-1">Descrição</Text>
          <Text className="text-xs text-neutral-400 mb-3">Opcional — ajuda na análise do caso</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva o ocorrido com mais detalhes..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={500}
            accessibilityLabel="Descrição da denúncia"
            style={{
              fontSize: 14,
              color: "#0F172A",
              borderWidth: 1,
              borderColor: "#E2E8F0",
              borderRadius: 12,
              padding: 12,
              minHeight: 96,
            }}
          />
          <Text className="text-xs text-neutral-400 mt-1 text-right">{description.length}/500</Text>
        </View>

        {/* Notice */}
        <View className="flex-row items-start gap-2 bg-amber-50 rounded-xl px-4 py-3 mb-2">
          <MaterialCommunityIcons name="shield-check-outline" size={18} color="#D97706" />
          <Text className="text-xs text-amber-700 flex-1 leading-4">
            Todas as denúncias são revisadas pela equipe do SquadUp. Denúncias falsas ou maliciosas
            podem resultar em suspensão da conta.
          </Text>
        </View>

        {/* Error */}
        {error ? (
          <View className="flex-row items-center gap-2 bg-error/10 rounded-xl px-4 py-3 mt-2">
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#EF4444" />
            <Text className="text-sm text-error flex-1">{error}</Text>
          </View>
        ) : null}
      </ScrollView>

      {/* Bottom action */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 pt-4 pb-8">
        <Button label="Enviar denúncia" onPress={handleSubmit} fullWidth />
      </View>
    </View>
  );
}
