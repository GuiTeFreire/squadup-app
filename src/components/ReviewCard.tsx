import React, { memo } from "react";
import { Text, View } from "react-native";

import type { Rating } from "../types";
import Avatar from "./Avatar";
import RatingStars from "./RatingStars";

interface ReviewCardProps {
  rating: Rating;
}

const criteriaLabel: Record<string, string> = {
  punctuality: "Pontualidade",
  respect: "Respeito",
  behavior: "Comportamento",
  presence: "Presença",
  overall: "Geral",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

function ReviewCard({ rating }: ReviewCardProps) {
  const { raterUser, criteria, comment, createdAt } = rating;

  const criteriaEntries = Object.entries(criteria) as [keyof typeof criteria, number][];
  const highlightEntry = criteriaEntries.reduce(
    (best, cur) => (cur[1] > best[1] ? cur : best),
    criteriaEntries[0]
  );

  return (
    <View className="bg-white rounded-2xl p-4 gap-3">
      <View className="flex-row items-center gap-3">
        <Avatar name={raterUser.name} photoUrl={raterUser.photoUrl} size="sm" />
        <View className="flex-1">
          <Text className="text-sm font-semibold text-secondary-900">{raterUser.name}</Text>
          <Text className="text-xs text-neutral-400">{formatDate(createdAt)}</Text>
        </View>
        <RatingStars rating={criteria.overall} size="sm" showValue />
      </View>

      <View className="flex-row items-center gap-1.5 self-start bg-amber-50 rounded-full px-2.5 py-1">
        <Text className="text-xs text-amber-700 font-medium">
          Destaque: {criteriaLabel[highlightEntry[0]]} {highlightEntry[1].toFixed(0)}/5
        </Text>
      </View>

      {comment ? <Text className="text-sm text-neutral-600 leading-5">{comment}</Text> : null}
    </View>
  );
}

export default memo(ReviewCard);
