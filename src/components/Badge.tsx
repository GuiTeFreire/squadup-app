import React, { memo } from "react";
import { Text, View } from "react-native";

import type { ExperienceLevel, MatchStatus, Sport } from "../types";

type BadgeVariant = "sport" | "level" | "status" | "custom";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  sport?: Sport;
  level?: ExperienceLevel;
  status?: MatchStatus;
}

const sportEmoji: Record<Sport, string> = {
  football: "⚽",
  volleyball: "🏐",
  basketball: "🏀",
  tennis: "🎾",
  futsal: "🥅",
  other: "🏅",
};

const levelStyle: Record<ExperienceLevel, string> = {
  beginner: "bg-primary-100 text-primary-700",
  intermediate: "bg-accent-100 text-accent-700",
  advanced: "bg-primary-900 text-white",
};

const statusStyle: Record<MatchStatus, string> = {
  open: "bg-primary-100 text-primary-700",
  full: "bg-error/10 text-error",
  pending_approval: "bg-warning/10 text-warning",
  closed: "bg-neutral-200 text-neutral-600",
  cancelled: "bg-neutral-200 text-neutral-500",
};

function Badge({ label, variant = "custom", sport, level, status }: BadgeProps) {
  let colorClass = "bg-secondary-100 text-secondary-700";
  let prefix = "";

  if (variant === "sport" && sport) {
    colorClass = "bg-primary-50 text-primary-700";
    prefix = `${sportEmoji[sport]} `;
  } else if (variant === "level" && level) {
    colorClass = levelStyle[level];
  } else if (variant === "status" && status) {
    colorClass = statusStyle[status];
  }

  return (
    <View className={`self-start rounded-full px-3 py-1 ${colorClass}`}>
      <Text className="text-xs font-medium">{`${prefix}${label}`}</Text>
    </View>
  );
}

export default memo(Badge);
