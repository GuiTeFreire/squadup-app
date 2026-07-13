import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Text, View } from "react-native";

interface TrustBadgesProps {
  isVerified: boolean;
  matchesPlayed: number;
  averageRating: number | null;
}

function TrustBadges({ isVerified, matchesPlayed, averageRating }: TrustBadgesProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {isVerified && (
        <View className="flex-row items-center gap-1 bg-primary-50 rounded-full px-3 py-1.5">
          <MaterialCommunityIcons name="check-decagram" size={14} color="#2563EB" />
          <Text className="text-xs font-semibold text-primary-700">Verificado</Text>
        </View>
      )}
      <View className="flex-row items-center gap-1 bg-secondary-50 rounded-full px-3 py-1.5">
        <MaterialCommunityIcons name="shield-check-outline" size={14} color="#0F172A" />
        <Text className="text-xs font-semibold text-secondary-700">
          {matchesPlayed} {matchesPlayed === 1 ? "partida" : "partidas"}
        </Text>
      </View>
      {averageRating !== null && (
        <View className="flex-row items-center gap-1 bg-warning/10 rounded-full px-3 py-1.5">
          <MaterialCommunityIcons name="star" size={14} color="#F59E0B" />
          <Text className="text-xs font-semibold text-warning">{averageRating.toFixed(1)}</Text>
        </View>
      )}
    </View>
  );
}

export default memo(TrustBadges);
