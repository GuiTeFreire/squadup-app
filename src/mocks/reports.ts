import type { Report } from "../types";
import { MOCK_MATCHES } from "./matches";
import { MOCK_USERS } from "./users";

const [guilherme, ana, rafael, juliana, thiago, beatriz] = MOCK_USERS;
const [match1, match2] = MOCK_MATCHES;
const closedMatch = MOCK_MATCHES.find((m) => m.id === "match-13")!;

export const MOCK_REPORTS: Report[] = [
  {
    id: "report-1",
    reportedUser: rafael,
    reporterUser: guilherme,
    match: match1,
    reason: "bad_behavior",
    description: "Ficou discutindo com outros jogadores durante a pelada.",
    createdAt: "2026-05-26T14:00:00Z",
    status: "pending",
  },
  {
    id: "report-2",
    reportedUser: juliana,
    reporterUser: ana,
    match: match2,
    reason: "no_show",
    description: "Confirmou presença e não apareceu, sem avisar ninguém.",
    createdAt: "2026-05-25T09:30:00Z",
    status: "pending",
  },
  {
    id: "report-3",
    reportedUser: thiago,
    reporterUser: beatriz,
    reason: "spam",
    description: "Enviou links de propaganda no chat da partida diversas vezes.",
    createdAt: "2026-05-20T18:00:00Z",
    status: "warned",
  },
  {
    id: "report-4",
    reportedUser: ana,
    reporterUser: beatriz,
    match: closedMatch,
    reason: "violence",
    description: "Empurrou outro participante após uma jogada mais dura.",
    createdAt: "2026-05-10T11:30:00Z",
    status: "archived",
  },
];
