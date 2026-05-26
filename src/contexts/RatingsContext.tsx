import React, { createContext, useContext, useState } from "react";

import type { RatingCriteria } from "../types";

interface SubmittedRating {
  matchId: string;
  ratedUserId: string;
  criteria: RatingCriteria;
  comment?: string;
}

interface RatingsContextValue {
  submittedRatings: SubmittedRating[];
  submitRating: (
    matchId: string,
    ratedUserId: string,
    criteria: RatingCriteria,
    comment?: string
  ) => void;
  hasRated: (matchId: string, ratedUserId: string) => boolean;
}

const RatingsContext = createContext<RatingsContextValue | null>(null);

export function RatingsProvider({ children }: { children: React.ReactNode }) {
  const [submittedRatings, setSubmittedRatings] = useState<SubmittedRating[]>([]);

  function submitRating(
    matchId: string,
    ratedUserId: string,
    criteria: RatingCriteria,
    comment?: string
  ) {
    setSubmittedRatings((prev) => [...prev, { matchId, ratedUserId, criteria, comment }]);
  }

  function hasRated(matchId: string, ratedUserId: string): boolean {
    return submittedRatings.some((r) => r.matchId === matchId && r.ratedUserId === ratedUserId);
  }

  return (
    <RatingsContext.Provider value={{ submittedRatings, submitRating, hasRated }}>
      {children}
    </RatingsContext.Provider>
  );
}

export function useRatingsContext() {
  const ctx = useContext(RatingsContext);
  if (!ctx) throw new Error("useRatingsContext must be used within RatingsProvider");
  return ctx;
}
