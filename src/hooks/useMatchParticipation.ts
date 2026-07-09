import { useCallback, useMemo } from "react";
import { Alert } from "react-native";

import { useMatchesContext } from "../contexts/MatchesContext";
import type { MatchDetail, ParticipationStatus, PublicUser } from "../types";

export interface UseMatchParticipationResult {
  match: MatchDetail | null;
  userStatus: ParticipationStatus | null;
  join: () => void;
  cancel: () => void;
}

export function useMatchParticipation(
  matchId: string,
  currentUser: PublicUser
): UseMatchParticipationResult {
  const { matches, updateParticipation } = useMatchesContext();

  const match = useMemo(() => matches.find((m) => m.id === matchId) ?? null, [matches, matchId]);

  const userStatus = useMemo((): ParticipationStatus | null => {
    if (!match) return null;
    const found = match.participants.find((p) => p.user.id === currentUser.id);
    if (!found || found.status === "cancelled") return null;
    return found.status;
  }, [match, currentUser.id]);

  const join = useCallback(() => {
    if (!match) return;
    const next: ParticipationStatus = match.requiresApproval ? "pending" : "confirmed";
    updateParticipation(matchId, currentUser, next);
  }, [match, matchId, currentUser, updateParticipation]);

  const cancel = useCallback(() => {
    Alert.alert("Cancelar participação", "Tem certeza que deseja cancelar?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim, cancelar",
        style: "destructive",
        onPress: () => updateParticipation(matchId, currentUser, "cancelled"),
      },
    ]);
  }, [matchId, currentUser, updateParticipation]);

  return { match, userStatus, join, cancel };
}
