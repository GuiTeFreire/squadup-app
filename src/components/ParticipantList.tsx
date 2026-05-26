import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Text, View } from "react-native";

import type { Participant } from "../types";
import Avatar from "./Avatar";
import RatingStars from "./RatingStars";

interface ParticipantListProps {
  participants: Participant[];
}

function ParticipantList({ participants }: ParticipantListProps) {
  const confirmed = participants.filter((p) => p.status === "confirmed");
  const pending = participants.filter((p) => p.status === "pending");

  return (
    <View>
      {confirmed.map(({ user }) => (
        <View
          key={user.id}
          className="flex-row items-center gap-3 py-3 border-b border-neutral-100"
        >
          <Avatar name={user.name} photoUrl={user.photoUrl} size="sm" />
          <View className="flex-1">
            <View className="flex-row items-center gap-1">
              <Text className="text-sm font-semibold text-secondary-900" numberOfLines={1}>
                {user.name}
              </Text>
              {user.isVerified && (
                <MaterialCommunityIcons name="check-decagram" size={14} color="#2563EB" />
              )}
            </View>
            <RatingStars rating={user.averageRating} size="sm" showValue={false} />
          </View>
          <Text className="text-xs text-neutral-400">{user.matchesPlayed} partidas</Text>
        </View>
      ))}
      {pending.map(({ user }) => (
        <View
          key={user.id}
          className="flex-row items-center gap-3 py-3 border-b border-neutral-100 opacity-60"
        >
          <Avatar name={user.name} photoUrl={user.photoUrl} size="sm" />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-secondary-900" numberOfLines={1}>
              {user.name}
            </Text>
            <Text className="text-xs text-accent-600">Aguardando aprovação</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default memo(ParticipantList);
