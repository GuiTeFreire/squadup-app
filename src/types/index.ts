export type Sport = "football" | "volleyball" | "basketball" | "tennis" | "futsal" | "other";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type MatchStatus = "open" | "full" | "pending_approval" | "closed" | "cancelled";

export type ParticipationStatus = "confirmed" | "pending" | "cancelled";

export type ReportReason =
  | "bad_behavior"
  | "violence"
  | "no_show"
  | "hate_speech"
  | "spam"
  | "fake_info"
  | "other";

export type ReportStatus = "pending" | "archived" | "warned" | "banned";

export interface User {
  id: string;
  name: string;
  photoUrl?: string;
  age: number;
  location: string;
  bio?: string;
  favoriteSports: Sport[];
  level: ExperienceLevel;
  averageRating: number;
  matchesPlayed: number;
  isVerified: boolean;
}

export interface Participant {
  user: User;
  status: ParticipationStatus;
}

export interface Match {
  id: string;
  sport: Sport;
  title: string;
  location: string;
  date: string;
  time: string;
  maxParticipants: number;
  level: ExperienceLevel;
  description?: string;
  organizer: User;
  participants: Participant[];
  status: MatchStatus;
  allowBeginners: boolean;
  requiresApproval: boolean;
}

export interface RatingCriteria {
  punctuality: number;
  respect: number;
  behavior: number;
  presence: number;
  overall: number;
}

export interface Rating {
  id: string;
  ratedUser: User;
  raterUser: User;
  match: Match;
  criteria: RatingCriteria;
  comment?: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reportedUser: User;
  reporterUser: User;
  match?: Match;
  reason: ReportReason;
  description: string;
  createdAt: string;
  status: ReportStatus;
}

export type MessageType = "message" | "system";

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  senderName: string;
  senderPhotoUrl?: string;
  text: string;
  createdAt: string;
  type: MessageType;
}
