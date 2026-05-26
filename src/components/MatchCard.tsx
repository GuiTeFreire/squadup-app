import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Text, View } from "react-native";

import type { Match } from "../types";
import { formatMatchDate } from "../utils/date";
import { getConfirmedCount } from "../hooks/useMatchFilters";
import Avatar from "./Avatar";
import Badge from "./Badge";
import Card from "./Card";

interface MatchCardProps {
  match: Match;
  onPress?: () => void;
}

const levelLabel: Record<Match["level"], string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

const statusLabel: Record<Match["status"], string | null> = {
  open: null,
  full: "Lotada",
  pending_approval: "Pendente",
  closed: "Encerrada",
  cancelled: "Cancelada",
};

function SlotsBar({ confirmed, max }: { confirmed: number; max: number }) {
  const ratio = max > 0 ? confirmed / max : 0;
  const available = max - confirmed;
  const pct = Math.min(ratio * 100, 100);

  let fillColor = "bg-success";
  if (available === 0) fillColor = "bg-error";
  else if (ratio >= 0.8) fillColor = "bg-accent-500";

  return (
    <View className="mt-3">
      <View className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
        <View className={`h-full rounded-full ${fillColor}`} style={{ width: `${pct}%` }} />
      </View>
      <Text className="text-xs text-neutral-500 mt-1">
        {available > 0
          ? `${available} ${available !== 1 ? "vagas disponíveis" : "vaga disponível"}`
          : "Sem vagas"}
        {" · "}
        {confirmed}/{max} confirmados
      </Text>
    </View>
  );
}

function MatchCard({ match, onPress }: MatchCardProps) {
  const confirmed = getConfirmedCount(match);
  const statusBadge = statusLabel[match.status];
  const isCancelled = match.status === "cancelled";

  return (
    <Card onPress={onPress} padded={false}>
      <View className={`p-4 ${isCancelled ? "opacity-60" : ""}`}>
        {/* Badges row */}
        <View className="flex-row flex-wrap gap-2 mb-2">
          <Badge
            variant="sport"
            sport={match.sport}
            label={
              match.sport === "football"
                ? "Futebol"
                : match.sport === "volleyball"
                  ? "Vôlei"
                  : match.sport === "basketball"
                    ? "Basquete"
                    : match.sport === "futsal"
                      ? "Futsal"
                      : match.sport === "tennis"
                        ? "Tênis"
                        : "Outro"
            }
          />
          <Badge variant="level" level={match.level} label={levelLabel[match.level]} />
          {statusBadge && <Badge variant="status" status={match.status} label={statusBadge} />}
          {match.requiresApproval && <Badge label="Aprovação" />}
        </View>

        {/* Title */}
        <Text className="text-base font-bold text-secondary-900 mb-2" numberOfLines={2}>
          {match.title}
        </Text>

        {/* Location */}
        <View className="flex-row items-center gap-1 mb-1">
          <MaterialCommunityIcons name="map-marker-outline" size={14} color="#64748B" />
          <Text className="text-sm text-neutral-500 flex-1" numberOfLines={1}>
            {match.location}
          </Text>
        </View>

        {/* Date + Time */}
        <View className="flex-row items-center gap-1">
          <MaterialCommunityIcons name="calendar-outline" size={14} color="#64748B" />
          <Text className="text-sm text-neutral-500">
            {formatMatchDate(match.date)} · {match.time}
          </Text>
        </View>

        {/* Slots bar */}
        {match.status !== "cancelled" && (
          <SlotsBar confirmed={confirmed} max={match.maxParticipants} />
        )}

        {/* Organizer */}
        <View className="flex-row items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
          <Avatar name={match.organizer.name} photoUrl={match.organizer.photoUrl} size="xs" />
          <Text className="text-xs text-neutral-500 flex-1" numberOfLines={1}>
            {match.organizer.name}
          </Text>
          {match.allowBeginners && (
            <View className="flex-row items-center gap-1">
              <MaterialCommunityIcons name="account-heart-outline" size={13} color="#22C55E" />
              <Text className="text-xs text-success">Iniciantes OK</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
}

export default memo(MatchCard);
