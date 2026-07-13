import type { ExperienceLevel } from "../../types";
import type { ApiMyProfile } from "../adapters/types";
import { apiClient } from "./client";

interface UpdateMyProfilePayload {
  level?: ExperienceLevel;
  photo_url?: string;
}

export async function fetchMyProfile(): Promise<ApiMyProfile> {
  return apiClient.get<ApiMyProfile>("/users/me");
}

export async function updateMyProfile(payload: UpdateMyProfilePayload): Promise<ApiMyProfile> {
  return apiClient.patch<ApiMyProfile>("/users/me", payload);
}
