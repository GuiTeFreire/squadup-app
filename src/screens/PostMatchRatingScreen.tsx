import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import Avatar from "../components/Avatar";
import Header from "../components/Header";
import RatingStars from "../components/RatingStars";
import { useMatchesContext } from "../contexts/MatchesContext";
import { useRatingsContext } from "../contexts/RatingsContext";
import { CURRENT_USER } from "../mocks/users";
import type { AppRootStackParamList } from "../navigation/types";
import type { Participant } from "../types";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;
type Route = RouteProp<AppRootStackParamList, "PostMatchRating">;

const levelLabel: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

function ParticipantRow({
  participant,
  alreadyRated,
  onRate,
}: {
  participant: Participant;
  alreadyRated: boolean;
  onRate: () => void;
}) {
  const { user } = participant;
  return (
    <View className="flex-row items-center gap-3 py-3 border-b border-neutral-100">
      <Avatar name={user.name} photoUrl={user.photoUrl} size="md" />
      <View className="flex-1">
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-semibold text-secondary-900" numberOfLines={1}>
            {user.name}
          </Text>
          {user.isVerified && (
            <MaterialCommunityIcons name="check-decagram" size={14} color="#2563EB" />
          )}
        </View>
        <Text className="text-xs text-neutral-400">{levelLabel[user.level]}</Text>
        <RatingStars rating={user.averageRating} size="sm" showValue />
      </View>
      {alreadyRated ? (
        <View className="flex-row items-center gap-1 bg-success/10 rounded-xl px-3 py-2">
          <MaterialCommunityIcons name="check-circle" size={16} color="#22C55E" />
          <Text className="text-xs font-semibold text-success">Avaliado</Text>
        </View>
      ) : (
        <Pressable
          onPress={onRate}
          className="bg-primary-500 rounded-xl px-3 py-2"
          accessibilityLabel={`Avaliar ${user.name}`}
          accessibilityRole="button"
        >
          <Text className="text-xs font-semibold text-white">Avaliar</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function PostMatchRatingScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { matchId } = route.params;
  const { matches } = useMatchesContext();
  const { hasRated } = useRatingsContext();

  const match = useMemo(() => matches.find((m) => m.id === matchId), [matches, matchId]);

  const otherParticipants = useMemo(
    () =>
      match
        ? match.participants.filter(
            (p) => p.status === "confirmed" && p.user.id !== CURRENT_USER.id
          )
        : [],
    [match]
  );

  const allRated =
    otherParticipants.length > 0 && otherParticipants.every((p) => hasRated(matchId, p.user.id));

  if (!match) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50">
        <Text className="text-neutral-500">Partida não encontrada.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      <Header title="Avaliar participantes" onBack={() => navigation.goBack()} />

      {/* Info banner */}
      <View className="bg-primary-500/10 border-b border-primary-200 px-4 py-3">
        <Text className="text-sm text-primary-700 text-center font-medium" numberOfLines={1}>
          {match.title}
        </Text>
        <Text className="text-xs text-neutral-500 text-center mt-0.5">
          Avalie os participantes desta partida
        </Text>
      </View>

      {otherParticipants.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-4xl mb-3">🏟️</Text>
          <Text className="text-base font-semibold text-secondary-900 text-center mb-1">
            Sem outros participantes
          </Text>
          <Text className="text-sm text-neutral-500 text-center">
            Não há outros confirmados nesta partida para avaliar.
          </Text>
        </View>
      ) : (
        <>
          {allRated && (
            <View className="flex-row items-center justify-center gap-2 bg-success/10 border-b border-success/20 px-4 py-3">
              <MaterialCommunityIcons name="check-circle" size={18} color="#22C55E" />
              <Text className="text-sm font-semibold text-success">
                Todos os participantes foram avaliados!
              </Text>
            </View>
          )}
          <FlatList
            data={otherParticipants}
            keyExtractor={(item) => item.user.id}
            renderItem={({ item }) => (
              <ParticipantRow
                participant={item}
                alreadyRated={hasRated(matchId, item.user.id)}
                onRate={() => navigation.navigate("RateUser", { matchId, userId: item.user.id })}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}
