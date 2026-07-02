import type { MaterialCommunityIcons } from "@expo/vector-icons";
import type React from "react";
import type { StyleProp, ViewStyle } from "react-native";

import type { ExperienceLevel, Sport } from "../types";

export type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

/**
 * Fonte única de verdade para cores consumidas fora do NativeWind
 * (props `color` de ícones, estilos inline, navegação).
 * Deve espelhar `tailwind.config.js`.
 */
export const colors = {
  primary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#2563EB",
    600: "#1D4ED8",
    700: "#1E40AF",
    800: "#1E3A8A",
    900: "#1E2D5A",
  },
  secondary: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },
  accent: {
    500: "#F97316",
    600: "#EA580C",
  },
  neutral: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
  },
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  white: "#FFFFFF",
} as const;

/**
 * Sistema de elevação — sombras consistentes (iOS) + elevation (Android).
 * Aplicar via prop `style`, já que NativeWind não cobre sombras custom.
 */
export const shadows: Record<"card" | "raised" | "floating" | "cta", StyleProp<ViewStyle>> = {
  /** Cards de conteúdo em repouso */
  card: {
    shadowColor: colors.secondary[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  /** Elementos que se destacam da lista (headers flutuantes, modais) */
  raised: {
    shadowColor: colors.secondary[900],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  /** Barras fixas sobre conteúdo rolável */
  floating: {
    shadowColor: colors.secondary[900],
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  /** CTA primário — glow sutil da cor da marca */
  cta: {
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};

/**
 * Identidade visual por esporte — ícone vetorial + cor de categoria.
 * Cores aplicadas via `style` (NativeWind compila classes estaticamente).
 */
export const SPORT_META: Record<
  Sport,
  { label: string; icon: IconName; color: string; bg: string }
> = {
  football: { label: "Futebol", icon: "soccer", color: "#059669", bg: "#ECFDF5" },
  futsal: { label: "Futsal", icon: "soccer-field", color: "#0D9488", bg: "#F0FDFA" },
  volleyball: { label: "Vôlei", icon: "volleyball", color: "#7C3AED", bg: "#F5F3FF" },
  basketball: { label: "Basquete", icon: "basketball", color: "#EA580C", bg: "#FFF7ED" },
  tennis: { label: "Tênis", icon: "tennis", color: "#65A30D", bg: "#F7FEE7" },
  other: { label: "Outro", icon: "trophy-outline", color: "#475569", bg: "#F1F5F9" },
};

export const LEVEL_META: Record<ExperienceLevel, { label: string }> = {
  beginner: { label: "Iniciante" },
  intermediate: { label: "Intermediário" },
  advanced: { label: "Avançado" },
};
