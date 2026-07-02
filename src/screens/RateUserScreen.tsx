import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import Avatar from "../components/Avatar";
import Button from "../components/Button";
import RatingStars from "../components/RatingStars";
import StarRatingInput from "../components/StarRatingInput";
import { useMatchesContext } from "../contexts/MatchesContext";
import { useRatingsContext } from "../contexts/RatingsContext";
import type { AppRootStackParamList } from "../navigation/types";
import type { RatingCriteria } from "../types";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;
type Route = RouteProp<AppRootStackParamList, "RateUser">;

const CRITERIA_LABELS: { key: keyof RatingCriteria; label: string }[] = [
  { key: "punctuality", label: "Pontualidade" },
  { key: "respect", label: "Respeito" },
  { key: "behavior", label: "Comportamento" },
  { key: "presence", label: "Presença" },
  { key: "overall", label: "Experiência geral" },
];

const EMPTY_CRITERIA: RatingCriteria = {
  punctuality: 0,
  respect: 0,
  behavior: 0,
  presence: 0,
  overall: 0,
};

const levelLabel: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

export default function RateUserScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { matchId, userId } = route.params;
  const { matches } = useMatchesContext();
  const { submitRating } = useRatingsContext();

  const [criteria, setCriteria] = useState<RatingCriteria>(EMPTY_CRITERIA);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const match = matches.find((m) => m.id === matchId);
  const user = match?.participants.find((p) => p.user.id === userId)?.user;

  if (!match || !user) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50">
        <Text className="text-neutral-500">Usuário não encontrado.</Text>
      </View>
    );
  }

  function setCriterion(key: keyof RatingCriteria, value: number) {
    setCriteria((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
  }

  function handleSubmit() {
    if (!user) return;
    const allFilled = CRITERIA_LABELS.every(({ key }) => criteria[key] >= 1);
    if (!allFilled) {
      setError("Avalie todos os critérios antes de enviar.");
      return;
    }
    submitRating(matchId, userId, criteria, comment.trim() || undefined);
    Alert.alert(
      "Avaliação enviada!",
      `Sua avaliação de ${user.name} foi registrada com sucesso. Obrigado pelo feedback!`,
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
        <Text className="flex-1 text-white text-lg font-bold text-center mx-2" numberOfLines={1}>
          Avaliar participante
        </Text>
        <View className="w-9" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      >
        {/* User card */}
        <View className="bg-white rounded-2xl p-4 flex-row items-center gap-3 mb-4">
          <Avatar name={user.name} photoUrl={user.photoUrl} size="lg" />
          <View className="flex-1">
            <View className="flex-row items-center gap-1">
              <Text className="text-base font-bold text-secondary-900" numberOfLines={1}>
                {user.name}
              </Text>
              {user.isVerified && (
                <MaterialCommunityIcons name="check-decagram" size={16} color="#2563EB" />
              )}
            </View>
            <Text className="text-xs text-neutral-500 mt-0.5">{levelLabel[user.level]}</Text>
            <RatingStars rating={user.averageRating} size="sm" showValue />
            <Text className="text-xs text-neutral-400 mt-0.5">
              {user.matchesPlayed} partidas concluídas
            </Text>
          </View>
        </View>

        {/* Criteria */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-sm font-semibold text-secondary-900 mb-4">
            Critérios de avaliação
          </Text>
          <View className="gap-5">
            {CRITERIA_LABELS.map(({ key, label }) => (
              <StarRatingInput
                key={key}
                label={label}
                value={criteria[key]}
                onChange={(v) => setCriterion(key, v)}
                size="lg"
              />
            ))}
          </View>
        </View>

        {/* Comment */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-sm font-semibold text-secondary-900 mb-3">
            Comentário <Text className="text-neutral-400 font-normal">(opcional)</Text>
          </Text>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Descreva sua experiência com este participante..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={280}
            accessibilityLabel="Comentário"
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
          <Text className="text-xs text-neutral-400 mt-1 text-right">{comment.length}/280</Text>
        </View>

        {/* Error */}
        {error ? (
          <View className="flex-row items-center gap-2 bg-error/10 rounded-xl px-4 py-3">
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#EF4444" />
            <Text className="text-sm text-error flex-1">{error}</Text>
          </View>
        ) : null}
      </ScrollView>

      {/* Bottom action */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 pt-4 pb-8">
        <Button label="Enviar avaliação" onPress={handleSubmit} fullWidth />
      </View>
    </View>
  );
}
