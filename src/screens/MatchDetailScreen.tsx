import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import Button from "../components/Button";
import ParticipantList from "../components/ParticipantList";
import RatingStars from "../components/RatingStars";
import { useMatchParticipation } from "../hooks/useMatchParticipation";
import { CURRENT_USER } from "../mocks/users";
import type { AppRootStackParamList } from "../navigation/types";
import { formatMatchDate } from "../utils/date";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;
type Route = RouteProp<AppRootStackParamList, "MatchDetail">;

const sportLabel: Record<string, string> = {
  football: "Futebol",
  volleyball: "Vôlei",
  basketball: "Basquete",
  futsal: "Futsal",
  tennis: "Tênis",
  other: "Outro",
};

const levelLabel: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

const statusLabel: Record<string, string> = {
  full: "Lotada",
  pending_approval: "Pendente",
  closed: "Encerrada",
  cancelled: "Cancelada",
};

function SlotsBar({ confirmed, max }: { confirmed: number; max: number }) {
  const available = max - confirmed;
  const ratio = max > 0 ? confirmed / max : 0;
  const pct = Math.min(ratio * 100, 100);

  let fillColor = "bg-success";
  if (available === 0) fillColor = "bg-error";
  else if (ratio >= 0.8) fillColor = "bg-accent-500";

  return (
    <View>
      <View className="h-2 bg-neutral-200 rounded-full overflow-hidden">
        <View className={`h-full rounded-full ${fillColor}`} style={{ width: `${pct}%` }} />
      </View>
      <Text className="text-sm text-neutral-500 mt-1">
        {available > 0
          ? `${available} ${available !== 1 ? "vagas disponíveis" : "vaga disponível"}`
          : "Sem vagas"}
        {" · "}
        {confirmed}/{max} confirmados
      </Text>
    </View>
  );
}

export default function MatchDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { matchId } = route.params;
  const { match, userStatus, join, cancel } = useMatchParticipation(matchId, CURRENT_USER);

  const confirmedCount = useMemo(
    () => (match ? match.participants.filter((p) => p.status === "confirmed").length : 0),
    [match]
  );

  if (!match) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50">
        <Text className="text-neutral-500">Partida não encontrada.</Text>
      </View>
    );
  }

  const isMatchOver = match.status === "closed" || match.status === "cancelled";
  const isMatchFull = match.status === "full" && userStatus !== "confirmed";

  const nonOpenStatus = match.status !== "open" ? statusLabel[match.status] : null;

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
          Detalhes da partida
        </Text>
        <View className="w-9" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="p-4 gap-5">
          {/* Badges */}
          <View className="flex-row flex-wrap gap-2">
            <Badge variant="sport" sport={match.sport} label={sportLabel[match.sport]} />
            <Badge variant="level" level={match.level} label={levelLabel[match.level]} />
            {nonOpenStatus && (
              <Badge variant="status" status={match.status} label={nonOpenStatus} />
            )}
            {match.requiresApproval && <Badge label="Aprovação necessária" />}
            {match.allowBeginners && <Badge label="Iniciantes OK" />}
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-secondary-900">{match.title}</Text>

          {/* Info block */}
          <View className="bg-white rounded-2xl p-4 gap-4">
            <View className="flex-row items-start gap-3">
              <MaterialCommunityIcons name="map-marker-outline" size={20} color="#2563EB" />
              <View className="flex-1">
                <Text className="text-xs text-neutral-400 uppercase font-medium mb-0.5">Local</Text>
                <Text className="text-sm text-secondary-900">{match.location}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons name="calendar-outline" size={20} color="#2563EB" />
              <View className="flex-1">
                <Text className="text-xs text-neutral-400 uppercase font-medium mb-0.5">Data</Text>
                <Text className="text-sm text-secondary-900">{formatMatchDate(match.date)}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons name="clock-outline" size={20} color="#2563EB" />
              <View className="flex-1">
                <Text className="text-xs text-neutral-400 uppercase font-medium mb-0.5">
                  Horário
                </Text>
                <Text className="text-sm text-secondary-900">{match.time}</Text>
              </View>
            </View>
          </View>

          {/* Slots */}
          {match.status !== "cancelled" && (
            <View className="bg-white rounded-2xl p-4">
              <Text className="text-sm font-semibold text-secondary-900 mb-3">Vagas</Text>
              <SlotsBar confirmed={confirmedCount} max={match.maxParticipants} />
            </View>
          )}

          {/* Description */}
          {match.description ? (
            <View className="bg-white rounded-2xl p-4">
              <Text className="text-sm font-semibold text-secondary-900 mb-2">Sobre a partida</Text>
              <Text className="text-sm text-neutral-600 leading-5">{match.description}</Text>
            </View>
          ) : null}

          {/* Organizer */}
          <View className="bg-white rounded-2xl p-4">
            <Text className="text-sm font-semibold text-secondary-900 mb-3">Organizador</Text>
            <View className="flex-row items-center gap-3">
              <Avatar name={match.organizer.name} photoUrl={match.organizer.photoUrl} size="md" />
              <View className="flex-1">
                <View className="flex-row items-center gap-1">
                  <Text className="text-sm font-semibold text-secondary-900" numberOfLines={1}>
                    {match.organizer.name}
                  </Text>
                  {match.organizer.isVerified && (
                    <MaterialCommunityIcons name="check-decagram" size={15} color="#2563EB" />
                  )}
                </View>
                <RatingStars rating={match.organizer.averageRating} size="sm" showValue />
                <Text className="text-xs text-neutral-400 mt-0.5">
                  {match.organizer.matchesPlayed} partidas
                </Text>
              </View>
            </View>
          </View>

          {/* Participants */}
          <View className="bg-white rounded-2xl p-4">
            <Text className="text-sm font-semibold text-secondary-900 mb-1">
              Participantes confirmados
            </Text>
            <Text className="text-xs text-neutral-400 mb-3">
              {confirmedCount} de {match.maxParticipants}
            </Text>
            <ParticipantList participants={match.participants} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom action area */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 pt-4 pb-8">
        {isMatchOver ? (
          <View className="gap-3">
            <Button label="Partida encerrada" onPress={() => {}} disabled fullWidth />
            {match.status === "closed" && userStatus === "confirmed" && (
              <Button
                label="Avaliar participantes"
                onPress={() => navigation.navigate("PostMatchRating", { matchId: match.id })}
                variant="ghost"
                fullWidth
              />
            )}
          </View>
        ) : userStatus === "confirmed" ? (
          <View className="gap-3">
            <View className="flex-row items-center justify-center gap-2 bg-success/10 rounded-xl py-3">
              <MaterialCommunityIcons name="check-circle-outline" size={18} color="#22C55E" />
              <Text className="text-sm font-semibold text-success">Você está confirmado</Text>
            </View>
            <Button
              label="Chat da partida"
              onPress={() => navigation.navigate("MatchChat", { matchId: match.id })}
              fullWidth
            />
            <Button label="Cancelar participação" onPress={cancel} variant="ghost" fullWidth />
          </View>
        ) : userStatus === "pending" ? (
          <View className="gap-3">
            <View className="flex-row items-center justify-center gap-2 bg-accent-500/10 rounded-xl py-3">
              <MaterialCommunityIcons name="clock-outline" size={18} color="#F97316" />
              <Text className="text-sm font-semibold text-accent-600">Aguardando aprovação</Text>
            </View>
            <Button label="Cancelar solicitação" onPress={cancel} variant="ghost" fullWidth />
          </View>
        ) : isMatchFull ? (
          <Button label="Partida lotada" onPress={() => {}} disabled fullWidth />
        ) : (
          <Button label="Participar" onPress={join} fullWidth />
        )}
      </View>
    </View>
  );
}
