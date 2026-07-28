import { useQuery } from "@tanstack/react-query";

import { toPublicUser } from "../services/adapters/user";
import { fetchPublicProfile } from "../services/api/users";
import { queryKeys } from "../services/queryKeys";
import type { PublicUser } from "../types";

export interface UsePublicProfileResult {
  profile: PublicUser | null;
  isLoading: boolean;
}

export function usePublicProfile(userId: string): UsePublicProfileResult {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.publicProfile(userId),
    queryFn: async () => toPublicUser(await fetchPublicProfile(userId)),
    enabled: Boolean(userId),
  });

  return { profile: data ?? null, isLoading };
}
