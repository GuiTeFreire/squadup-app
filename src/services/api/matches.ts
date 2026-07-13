import type { ExperienceLevel, Sport } from "../../types";
import type { ApiMatchDetail, ApiMatchSummary } from "../adapters/types";
import { apiClient } from "./client";

export interface MatchesQueryFilters {
  sport?: Sport | null;
  level?: ExperienceLevel | null;
  date?: string | null;
  location?: string | null;
  hasOpenSlots?: boolean;
}

interface CreateMatchPayload {
  sport: Sport;
  title: string;
  location: string;
  date: string;
  time: string;
  max_participants: number;
  level: ExperienceLevel;
  description?: string;
  allow_beginners: boolean;
  requires_approval: boolean;
}

function buildQueryString(filters: MatchesQueryFilters): string {
  const params = new URLSearchParams();
  if (filters.sport) params.set("sport", filters.sport);
  if (filters.level) params.set("level", filters.level);
  if (filters.date) params.set("date", filters.date);
  if (filters.location) params.set("location", filters.location);
  if (filters.hasOpenSlots) params.set("has_open_slots", "true");
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function fetchMatches(filters: MatchesQueryFilters = {}): Promise<ApiMatchSummary[]> {
  return apiClient.get<ApiMatchSummary[]>(`/matches${buildQueryString(filters)}`);
}

export async function fetchMatchDetail(matchId: string): Promise<ApiMatchDetail> {
  return apiClient.get<ApiMatchDetail>(`/matches/${matchId}`);
}

export async function createMatch(payload: CreateMatchPayload): Promise<ApiMatchSummary> {
  return apiClient.post<ApiMatchSummary>("/matches", payload);
}

export async function joinMatch(matchId: string): Promise<ApiMatchSummary> {
  return apiClient.post<ApiMatchSummary>(`/matches/${matchId}/join`);
}

export async function leaveMatch(matchId: string): Promise<ApiMatchSummary> {
  return apiClient.post<ApiMatchSummary>(`/matches/${matchId}/leave`);
}

export async function closeMatch(matchId: string): Promise<ApiMatchSummary> {
  return apiClient.post<ApiMatchSummary>(`/matches/${matchId}/close`);
}

export async function approveParticipant(
  matchId: string,
  userId: string
): Promise<ApiMatchSummary> {
  return apiClient.post<ApiMatchSummary>(`/matches/${matchId}/participants/${userId}/approve`);
}
